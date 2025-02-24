import mongoose from "mongoose";

const CreditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  credits: { type: Number, default: 2 },
  lastResetDate: { type: Date, default: new Date() },
});

export default mongoose.model("Credit", CreditSchema);
