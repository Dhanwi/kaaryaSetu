import express from "express";
import passport from "../lib/passportConfig.js";
import jwt from "jsonwebtoken";
import authKeys from "../lib/authKeys.js";
import { OAuth2Client } from "google-auth-library";
import User from "../db/User.js";
import JobApplicant from "../db/JobApplicant.js";
import Recruiter from "../db/Recruiter.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const redirectUrl = data.redirect || "/"; // Extract redirect URL

    if (!data.email || !data.password || !data.type || !data.name) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if email already exists
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Ensure contactNumber is either a valid number or null
    let contactNumber = data.contactNumber?.trim() || null;

    // Check if contact number already exists (Only if not null)
    if (contactNumber) {
      let existingContact = await JobApplicant.findOne({ contactNumber });
      if (!existingContact) {
        existingContact = await Recruiter.findOne({ contactNumber });
      }
      if (existingContact) {
        return res
          .status(400)
          .json({ error: "Contact number already exists." });
      }
    }

    // Validate education years
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 30;
    const maxYear = currentYear + 10;

    data.education = data.education.map((edu) => {
      if (edu.startYear < minYear || edu.startYear > maxYear) {
        throw new Error(
          `Start year ${edu.startYear} is out of valid range (${minYear}-${maxYear}).`
        );
      }
      if (edu.endYear && (edu.endYear < minYear || edu.endYear > maxYear)) {
        throw new Error(
          `End year ${edu.endYear} is out of valid range (${minYear}-${maxYear}).`
        );
      }
      if (edu.startYear >= edu.endYear) {
        throw new Error(
          `Start year ${edu.startYear} must be less than end year ${edu.endYear}.`
        );
      }
      return edu;
    });

    // Create new user
    let user = new User({
      email: data.email,
      password: data.password,
      type: data.type,
    });

    await user.save();

    // Create user profile
    const userType = data.type || "applicant";
    let ProfileModel = userType === "recruiter" ? Recruiter : JobApplicant;

    let userProfile = await ProfileModel.findOne({ userId: user._id });

    if (!userProfile) {
      const newProfile =
        userType === "recruiter"
          ? new Recruiter({
              userId: user._id,
              name: data.name,
              contactNumber: contactNumber, // Now storing as null if empty
              bio: data.bio || "",
            })
          : new JobApplicant({
              userId: user._id,
              name: data.name,
              education: data.education || [],
              contactNumber: contactNumber, // Now storing as null if empty
              skills: data.skills || [],
              rating: data.rating || 0,
              resume: data.resume || "",
              profile: data.profile || "",
            });

      await newProfile.save();
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey, {
      expiresIn: "1d",
    });

    res.json({
      token: token,
      type: user.type,
      redirect: redirectUrl, // Include redirect URL in response
    });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        console.error("Error in /login route:", err);
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);

      // Include redirect URL in response if provided
      const redirectUrl = req.query.redirect || "/";
      res.json({
        token: token,
        type: user.type,
        redirect: redirectUrl, // Include redirect URL in response
      });
    }
  )(req, res, next);
});

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      if (!req.user) {
        console.error("Google OAuth failed: User not found");
        return res.status(401).json({ error: "Google OAuth failed" });
      }

      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        console.error("User not found after Google login.");
        return res.redirect(`${process.env.VITE_URL}/signup`); // Redirect to signup if user is missing
      }

      // Ensure user type is properly set
      const userType = req.query.type || user.type || "applicant";
      user.type = userType; // Update type if needed
      await user.save();

      // Generate JWT token
      const jwtToken = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey, {
        expiresIn: "1d",
      });

      // Set token in HTTP-only cookie instead of URL
      res.cookie("token", jwtToken, {
        httpOnly: true, // Secure, cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
      });

      // Redirect to frontend without token in URL
      const redirectUrl = req.query.redirect || "/";
      return res.redirect(`${process.env.VITE_URL}${redirectUrl}`);
    } catch (error) {
      console.error("Error in Google OAuth callback:", error);
      return res.redirect(
        `${process.env.VITE_URL}/login?error=google_auth_failed`
      );
    }
  }
);

router.post("/google", async (req, res) => {
  const { token, redirect } = req.body; // Get the redirect URL from the request body

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      const userType = req.body.type || "applicant"; // Default to applicant if type is not provided

      user = new User({
        email: payload.email,
        type: userType,
        googleId: payload.sub, // Save Google ID
      });
      await user.save();
      await JobApplicant.updateOne(
        { userId: user._id },
        { $set: { createdAt: new Date() } }
      );

      let ProfileModel = userType === "recruiter" ? Recruiter : JobApplicant;

      const userProfile = await ProfileModel.findOne({ userId: user._id });

      if (!userProfile) {
        const newProfile =
          userType === "recruiter"
            ? new Recruiter({
                userId: user._id,
                name: payload.name,
                contactNumber: null, // Ensure contactNumber is an empty string
                bio: "",
              })
            : new JobApplicant({
                userId: user._id,
                name: payload.name,
                contactNumber: null,
                education: [],
                skills: [],
                resume: "",
                profile: "",
              });

        await newProfile.save(); // Wait until profile is saved
      }
    }

    const jwtToken = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);

    res.json({
      token: jwtToken,
      type: user.type, // Send correct user type
      redirect: redirect || "/", // Include the redirect URL in the response
    });
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(400).json({ error: "Authentication failed" });
  }
});

export default router;
