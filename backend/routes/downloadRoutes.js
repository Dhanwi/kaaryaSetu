import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/resume/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/resume", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }
    res.sendFile(filePath);
  });
});

router.get("/profile/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/profile", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }
    res.sendFile(filePath);
  });
});

export default router;
