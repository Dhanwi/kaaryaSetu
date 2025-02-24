import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import { pipeline as streamPipeline } from "stream";
import path from "path";
import { fileURLToPath } from "url";
import jwtAuth from "../lib/jwtAuth.js";
import User from "../db/User.js";
import JobApplicant from "../db/JobApplicant.js";

const pipeline = promisify(streamPipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Add this function to dynamically import multer
async function getMulter() {
  const multer = await import("multer");
  return multer.default;
}

router.post("/resume", async (req, res) => {
  const multer = await getMulter();
  const upload = multer().single("file");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error while uploading" });
    }
    const { file } = req;
    if (file.detectedFileExtension != ".pdf") {
      res.status(400).json({
        message: "Invalid format",
      });
    } else {
      const filename = `${uuidv4()}${file.detectedFileExtension}`;

      pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
      )
        .then(async () => {
          const resumeUrl = `/host/resume/${filename}`;

          res.send({
            message: "File uploaded successfully",
            url: resumeUrl,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Error while uploading",
          });
        });
    }
  });
});

router.post("/profile", async (req, res) => {
  const multer = await getMulter();
  const upload = multer().single("file");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error while uploading" });
    }
    const { file } = req;
    if (
      file.detectedFileExtension != ".jpg" &&
      file.detectedFileExtension != ".png"
    ) {
      res.status(400).json({
        message: "Invalid format",
      });
    } else {
      const filename = `${uuidv4()}${file.detectedFileExtension}`;

      pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
      )
        .then(() => {
          res.send({
            message: "Profile image uploaded successfully",
            url: `/host/profile/${filename}`,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Error while uploading",
          });
        });
    }
  });
});

export default router;
