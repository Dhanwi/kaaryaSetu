import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "mongoose-type-email";

let schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          if (!v) {
            console.error("Email validation failed: null or undefined");
            return false;
          }
          return /\S+@\S+\.\S+/.test(v);
        },
        msg: "Email is invalid!",
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Make password required only if googleId is not present
      },
      select: false,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant"],
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
  },
  { collation: { locale: "en" } }
);

// Password hashing
schema.pre("save", function (next) {
  let user = this;

  // if the data is not modified or password is not set
  if (!user.isModified("password") || !user.password) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Password verification upon login
schema.methods.login = function (password) {
  let user = this;

  return new Promise((resolve, reject) => {
    if (!user.password) {
      return reject(new Error("Password not set for user"));
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export default mongoose.model("UserAuth", schema);
