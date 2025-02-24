import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      default: null, // Default to null to prevent unnecessary empty strings
      validate: {
        validator: function (v) {
          return v === null || /^\+?\d{1,3}[-\s]?\d{10}$/.test(v); // Allow null or valid phone number
        },
        message: "Phone number is invalid!",
      },
    },

    bio: {
      type: String,
      default: "", // Default to prevent validation issues
    },
  },
  { collation: { locale: "en" } }
);

export default mongoose.model("RecruiterInfo", schema);
