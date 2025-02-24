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
    education: [
      {
        institutionName: {
          type: String,
          required: function () {
            return this.education && this.education.length > 0;
          }, // Only required if education is provided
        },
        startYear: {
          type: Number,
          min: 1930,
          max: new Date().getFullYear(),
          required: function () {
            return this.institutionName; // Required only if institutionName exists
          },
          validate: {
            validator: Number.isInteger,
            message: "Start year should be an integer",
          },
        },
        endYear: {
          type: Number,
          max: new Date().getFullYear(),
          validate: [
            { validator: Number.isInteger, msg: "Year should be an integer" },
            {
              validator: function (value) {
                return !this.startYear || this.startYear <= value;
              },
              msg: "End year should be greater than or equal to Start year",
            },
          ],
        },
      },
    ],
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

    skills: {
      type: [String],
      default: [], // Default empty array
    },
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
    resume: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
  },
  { collation: { locale: "en" } }
);

export default mongoose.model("JobApplicantInfo", schema);
