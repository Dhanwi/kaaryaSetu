import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../db/User.js";
import JobApplicant from "../db/JobApplicant.js";
import Recruiter from "../db/Recruiter.js";
import authKeys from "./authKeys.js";
import dotenv from "dotenv";

dotenv.config();

const filterJson = (obj, unwantedKeys) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (unwantedKeys.indexOf(key) === -1) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};


passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done, res) => {
      User.findOne({ email: email })
        .select("+password")
        .exec((err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: "User does not exist",
            });
          }

          user
            .login(password)
            .then(() => {
              user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
              return done(null, user);
            })
            .catch((err) => {
              return done(err, false, {
                message: "Password is incorrect.",
              });
            });
        });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authKeys.jwtSecretKey,
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload._id)
        .select("+password")
        .exec((err, user) => {
          if (err) {
            return done(err, false, {
              message: "Incorrect Token",
            });
          }
          if (!user) {
            return done(null, false, {
              message: "JWT Token does not exist",
            });
          }
          user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
          return done(null, user);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4445/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            type: "applicant", // Default type, can be changed based on your logic
            password: "", // Set an empty password or handle it differently
          });
          await user.save();
          const userDetails =
            user.type === "recruiter"
              ? new Recruiter({
                  userId: user._id,
                  name: profile.displayName,
                  contactNumber: "",
                  bio: "",
                })
              : new JobApplicant({
                  userId: user._id,
                  name: profile.displayName,
                  contactNumber: "",
                  education: [],
                  skills: [],
                  resume: "",
                  profile: "",
                });
          await userDetails.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
