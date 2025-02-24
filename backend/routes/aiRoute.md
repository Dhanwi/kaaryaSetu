import express from "express";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import {
  selectModel,
  generateColdMail,
  extractTextFromPDF,
  calculateATSMatch,
} from "../utils/aiUtils.js";
import { shuffleArray, models } from "../utils/modelUtils.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { pipeline as streamPipeline } from "stream";
import { fileURLToPath } from "url";
import jwtAuth from "../lib/jwtAuth.js";
import User from "../db/User.js";
import cron from "node-cron";

const router = express.Router();

//modelRoutes for shuffling:
router.get("/models", (req, res) => {
  const shuffledModels = shuffleArray([...models]);
  res.json({ models: shuffledModels });
});

router.post("/:modelId/generate-prompt", jwtAuth, async (req, res) => {
  const { modelId } = req.params;
  const { jobDescription, userName } = req.body;


  try {
    const user = req.user;
    const userData = await User.findById(user._id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has enough credits
    if (userData.credits < 1) {
      return res
        .status(400)
        .json({
          message:
            "You have reached your credit limit. You can use the free prompt.",
        });
    }

    // Deduct credit
    userData.credits = userData.credits - 1;
    await userData.save();

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

    res.json({ prompt, credits: userData.credits });
  } catch (error) {
    console.error("Error generating prompt:", error);
    res.status(500).json({ error: "Failed to generate prompt" });
  }
});

const pipeline = promisify(streamPipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add this function to dynamically import multer
async function getMulter() {
  const multer = await import("multer");
  return multer.default;
}

router.post("/:modelId/ats-checker", async (req, res) => {
  const multer = await getMulter();
  const upload = multer().single("resume"); // Change 'file' to 'resume'

  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(400).json({ message: "Error while uploading file" });
    }

    console.log("Uploaded file:", req.file); // Debug log for the file

    const { file } = req;
    const { modelId } = req.params;
    const { jobDescription } = req.body; // Remove convertOptions

    if (!modelId || !jobDescription) {
      return res.status(400).json({
        message: "Missing required parameters: modelId or jobDescription",
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "No file was uploaded. Please provide a valid PDF file.",
      });
    }

    if (file.detectedFileExtension !== ".pdf") {
      return res.status(400).json({
        message: "Invalid file format. Only PDF files are supported.",
      });
    }

    // Generate unique filename and save the file
    const filename = `${uuidv4()}${file.detectedFileExtension}`;
    const filePath = path.join(__dirname, "../public/resume", filename);

    try {
      await pipeline(file.stream, fs.createWriteStream(filePath));
      console.log(`File saved successfully at ${filePath}`);

      // Process the uploaded file for ATS checking
      try {
        const { matchPercentage, missingSkills, finalThoughts } =
          await calculateATSMatch(modelId, jobDescription, filePath); // Remove convertOptions

        // Send response with ATS match details
        res.json({
          message: "ATS match calculated successfully",
          matchPercentage,
          missingSkills,
          finalThoughts,
        });

        // Clean up: Delete the file after processing
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Failed to delete file: ${filePath}`, unlinkErr);
          }
        });
      } catch (processErr) {
        console.error("Error processing the uploaded file:", processErr);

        res.status(500).json({
          message: "Error processing the uploaded file for ATS match.",
        });

        // Clean up: Delete the file in case of an error
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Failed to delete file: ${filePath}`, unlinkErr);
          }
        });
      }
    } catch (uploadErr) {
      console.error("Error while saving the uploaded file:", uploadErr);
      res.status(500).json({
        message: "Error while saving the uploaded file.",
      });
    }
  });
});

router.post("/initialize-credits", jwtAuth, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user._id);

    if (userData.credits === undefined) {
      userData.credits = 2; // Initialize credits to 2 per day
      await userData.save();
    }
    res.json({
      message: "User credits initialized successfully.",
      credits: userData.credits,
    });
  } catch (error) {
    res.status(500).json({ message: "Error initializing user credits." });
  }
});

// Function to reset credits daily
const resetCreditsDaily = async () => {
  try {
    await User.updateMany({}, { $set: { credits: 2 } });
    console.log("User credits reset successfully.");
  } catch (error) {
    console.error("Error resetting user credits:", error);
  }
};

// Schedule the resetCreditsDaily function to run at midnight
cron.schedule("0 0 * * *", resetCreditsDaily);

// Route to get user credits
router.get("/credits", jwtAuth, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user._id);
    res.json({ credits: userData.credits });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user credits." });
  }
});

// Route to update user credits
router.put("/credits", jwtAuth, async (req, res) => {
  const { credits } = req.body;
  try {
    const user = req.user;
    const userData = await User.findById(user._id);
    userData.credits = credits;
    await userData.save();
    res.json({ message: "User credits updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating user credits." });
  }
});

export default router;
