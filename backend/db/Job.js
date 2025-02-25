import mongoose from "mongoose";

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    maxApplicants: {
      type: Number,
      validate: {
        validator: function (value) {
          return value == null || Number.isInteger(value);
        },
        msg: "maxApplicants should be an integer",
      },
    },
    maxPositions: {
      type: Number,
      validate: {
        validator: function (value) {
          return value == null || Number.isInteger(value);
        },
        msg: "maxPositions should be an integer",
      },
    },
    activeApplications: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "activeApplications should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "activeApplications should greater than equal to 0",
        },
      ],
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "acceptedCandidates should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "acceptedCandidates should greater than equal to 0",
        },
      ],
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfPosting < value;
          },
          msg: "deadline should be greater than dateOfPosting",
        },
      ],
    },
    skillsets: [String],
    jobType: {
      type: String,
    },
    workType: {
      type: String,
    },
    url: {
      type: String,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    funding: {
      type: String,
    },
    hrDetails: [
      {
        hrMail: {
          type: String,
        },
        hrContactNumber: {
          type: String,
          validate: {
            validator: function (v) {
              return !v || /^\+?\d{1,3}[-\s]?\d{10}$/.test(v);
            },
            msg: "Phone number is invalid!",
          },
        },
        hrInfo: {
          type: String,
        },
      },
    ],
    prompts: {
      type: [String],
      default: [],
    },
    duration: {
      type: Number,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Duration should be an integer",
        },
      ],
    },
    salary: {
      type: String,
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
  },
  { collation: { locale: "en" } }
);

export default mongoose.model("jobs", schema);
