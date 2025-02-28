import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passportConfig from "./lib/passportConfig.js";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
// app.use(
//   cors({
//     origin: process.env.VITE_URL,
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173", // Allow frontend development server
  "https://kaaryasetu.tech", // Allow production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(passportConfig.initialize());

// Security Headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://accounts.google.com/gsi/client; " +
      "frame-src 'self' https://accounts.google.com/gsi/; " +
      "connect-src 'self' https://accounts.google.com/gsi/;"
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// JWKS Client for Token Validation
const client = jwksClient({
  jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
// Event Receiver Endpoint for Security Events
app.post("/google/security-events", async (req, res) => {
  const token = req.body.token; // Extract the token from the request body

  try {
    // Decode the token without verifying it
    const decodedToken = jwt.decode(token, { complete: true });

    // Validate the token
    jwt.verify(
      token,
      getKey,
      {
        issuer: "https://accounts.google.com/",
        audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
        algorithms: ["RS256"],
      },
      (err, verifiedToken) => {
        if (err) {
          console.error("Invalid token:", err.message);
          return res.status(400).send("Invalid token");
        }
        // Handle the security event
        console.log("Security event received:", verifiedToken);

        // Acknowledge receipt of the token
        res.status(202).send("Event received");
      }
    );
  } catch (error) {
    console.error("Error processing security event:", error.message);
    res.status(400).send("Error processing token");
  }
});

// Routing
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/upload", (await import("./routes/uploadRoutes.js")).default);
app.use("/host", (await import("./routes/downloadRoutes.js")).default);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
