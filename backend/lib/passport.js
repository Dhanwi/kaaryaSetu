// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../db/User.js";
// import JobApplicant from "../db/JobApplicant.js";
// import Recruiter from "../db/Recruiter.js";
// import authKeys from "./authKeys.js";

// // ...existing code...

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ email: profile.emails[0].value });
//         if (!user) {
//           user = new User({
//             email: profile.emails[0].value,
//             type: "applicant", // Default type, can be changed based on your logic
//           });
//           await user.save();
//           const userDetails = new JobApplicant({
//             userId: user._id,
//             name: profile.displayName,
//             contactNumber: "",
//             education: [],
//             skills: [],
//             resume: "",
//             profile: "",
//           });
//           await userDetails.save();
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// // ...existing code...
