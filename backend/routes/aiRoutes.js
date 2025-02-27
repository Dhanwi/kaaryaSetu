import express from "express";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { selectModel, generateColdMail } from "../utils/aiUtils.js";
import { shuffleArray, models } from "../utils/modelUtils.js";
import jwtAuth from "../lib/jwtAuth.js";
import User from "../db/User.js";
import Credit from "../db/Credit.js";
import cron from "node-cron";
import moment from "moment-timezone";

const router = express.Router();

// Schedule Credit Reset at Midnight (UTC)
cron.schedule("0 0 * * *", async () => {
  try {
    const users = await User.find({});
    users.forEach(async (user) => {
      user.credits = 2;
      await user.save();
    });
    // console.log("User credits reset to 2 at midnight UTC.");
  } catch (error) {
    console.error("Error resetting user credits:", error);
  }
});

//modelRoutes for shuffling:
router.get("/models", (req, res) => {
  const shuffledModels = shuffleArray([...models]);
  res.json({ models: shuffledModels });
});

router.post("/initialize-credits", jwtAuth, async (req, res) => {
  try {
    const user = req.user;
    let creditData = await Credit.findOne({ userId: user._id });

    if (!creditData) {
      creditData = new Credit({ userId: user._id, credits: 2 });
      await creditData.save();
    }

    res.json({
      message: "User credits initialized successfully.",
      credits: creditData.credits,
    });
  } catch (error) {
    console.error("Error initializing user credits:", error);
    res.status(500).json({ message: "Error initializing user credits." });
  }
});

router.post("/:modelId/generate-prompt", jwtAuth, async (req, res) => {
  const { modelId } = req.params;
  const { jobDescription, userName } = req.body;

  try {
    const user = req.user;
    let creditData = await Credit.findOne({ userId: user._id });

    if (!creditData) {
      creditData = new Credit({
        userId: user._id,
        credits: 2,
        lastResetDate: new Date(),
      });
      await creditData.save();
    }

    if (creditData.credits < 1) {
      return res.status(403).json({
        message:
          "You have reached your credit limit for today. Try again tomorrow.",
      });
    }

    creditData.credits -= 1;
    creditData.lastResetDate = new Date(); // 🔥 Ensure this gets updated!

    await creditData.save();

    let prompt;
    if (modelId === "gpt-4o-mini" || modelId === "gpt-3.5-turbo") {
      prompt = await generateColdMail(modelId, jobDescription, userName);
    } else if (
      modelId === "llama-3.3-70b-versatile" ||
      modelId === "llama-3.1-8b-instant" ||
      modelId === "gemma2-9b-it"
    ) {
      prompt = await generateColdMail(modelId, jobDescription, userName);
    } else if (
      modelId === "gemini-1.5-flash" ||
      modelId === "gemini-1.5-pro" ||
      modelId === "text-embedding-004"
    ) {
      prompt = await generateColdMail(modelId, jobDescription, userName);
    } else {
      console.error("Invalid model ID:", modelId);
      return res.status(400).json({ error: "Invalid model ID" });
    }

    res.json({ prompt, credits: creditData.credits });
  } catch (error) {
    console.error("❌ Error generating prompt:", error);
    res.status(500).json({ error: "Failed to generate prompt" });
  }
});

router.get("/credits", jwtAuth, async (req, res) => {
  try {
    const user = req.user;
    let creditData = await Credit.findOne({ userId: user._id });

    if (!creditData) {
      creditData = new Credit({
        userId: user._id,
        credits: 2,
        lastResetDate: moment().utc().startOf("day").toDate(), // 🔥 Save in UTC
      });
      await creditData.save();
    }

    // 🔍 Convert `lastResetDate` and `today` to UTC YYYY-MM-DD format
    const lastResetDateUTC = moment(creditData.lastResetDate)
      .utc()
      .format("YYYY-MM-DD");
    const todayUTC = moment().utc().format("YYYY-MM-DD");

    // console.log(`🔍 Last Reset Date: ${lastResetDateUTC}, Today: ${todayUTC}`);

    if (lastResetDateUTC !== todayUTC) {
      // console.log(`🔄 Resetting credits for user: ${user._id}`);
      creditData.credits = 2;
      creditData.lastResetDate = moment().utc().startOf("day").toDate(); // 🔥 Ensure this updates properly
      await creditData.save();
    }

    res.json({ credits: creditData.credits });
  } catch (error) {
    console.error("❌ Error fetching user credits:", error);
    res.status(500).json({ message: "Error fetching user credits." });
  }
});

export default router;
