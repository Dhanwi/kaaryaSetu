import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import OpenAI from "openai"; // Import the OpenAI library
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument } from "pdf-lib";
import { fromPath } from "pdf2pic";
// import pdfToPic from "pdf2pic";
import fs from "fs";

// Ensure the environment variable is loaded
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty."
  );
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize GroqCloud
const groq = new Groq({ apiKey: process.env.GROQCLOUD_API_KEY });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// Define API usage limits
const DAILY_CREDIT_LIMIT = {
  openai: 5,
  groq: 10,
  genAI: 7,
};

// Track user credits
let userCredits = {};

// Select an AI model based on availability and user preference
export function selectModel(userId) {
  if (!userCredits[userId]) {
    userCredits[userId] = { openai: 0, groq: 0, genAI: 0 };
  }
  const credits = userCredits[userId];

  if (credits.openai < DAILY_CREDIT_LIMIT.openai) return "openai";
  if (credits.groq < DAILY_CREDIT_LIMIT.groq) return "groq";
  if (credits.genAI < DAILY_CREDIT_LIMIT.genAI) return "genAI";
  return null; // All limits exceeded
}

// Constants for token and request limits
const MODEL_LIMITS = {
  openai: {
    "gpt-4o-mini": {
      maxTokens: 300,
      requestsPerDay: 200,
      tokensPerMinute: 60000,
    },
    "gpt-3.5-turbo": {
      maxTokens: 150,
      requestsPerDay: 200,
      tokensPerMinute: 40000,
    },
  },
  gemini: {
    "gemini-1.5-flash": {
      maxTokens: 8192,
      requestsPerDay: 1500,
      tokensPerMinute: 1000000,
    },
    "gemini-1.5-pro": {
      maxTokens: 8192,
      requestsPerDay: 50,
      tokensPerMinute: 32000,
    },
    "text-embedding-004": { maxTokens: 2048, requestsPerMinute: 1500 },
  },
  groq: {
    "llama-3.3-70b-versatile": { maxTokens: 700, requestsPerDay: 1000 },
    "llama-3.1-8b-instant": { maxTokens: 700, requestsPerDay: 1000 },
    "gemma2-9b-it": { maxTokens: 700, requestsPerDay: 1000 },
  },
};

// Function to generate cold mail
export async function generateColdMail(model, jobDescription, userName) {
  const prompt = `Generate a professional cold mail (with a proper formating, Like subject wll be in one line, then main email content will be written in 1-2 para and finally the last part contain, best regards, then next like username, then next line user contact info )for a job with the following description: "${jobDescription}". Include the user's name: "${userName}".`;
  const systemMessage = {
    role: "system",
    content: `
        You are an expert in the field of job applications and communication.
        Your task is to generate cold email prompts tailored to a job description.
        The email should:
        - Highlight the user's skills and suitability for the job.
        - Be professional, polite, and to the point.
        - Encourage the HR or hiring manager to review the candidate's resume.
      `,
  };

  const userMessage = {
    role: "user",
    content: `
        Job Description: ${jobDescription}
        Candidate Name: ${userName}

        Generate a cold email that the user can send to HR or the hiring manager.
        The email should:
        - Begin with a polite greeting.
        - Mention the candidate's name and their interest in the job role.
        - Highlight specific skills or experiences relevant to the job description.
        - Politely request the hiring manager to review the resume.
        - End with a thank you note and contact information placeholder.

        also email should be properly formatted with a proper formating, Like subject wll be in one line, then main email content will be written in 1-2 para and finally the last part contain, best regards, then next like username, then next line user contact info 

        Output only the email content.
      `,
  };

  console.log("Generating cold mail with prompt:", prompt);

  try {
    switch (model) {
      // OpenAI Models
      case "gpt-4o-mini":
      case "gpt-3.5-turbo":
        const openAILimits = MODEL_LIMITS.openai[model];
        const responseOpenAI = await openai.chat.completions.create({
          model: model,
          messages: [systemMessage, userMessage],
          max_tokens: openAILimits.maxTokens,
        });
        console.log("OpenAI response:", responseOpenAI);
        return responseOpenAI.choices[0].message.content.trim();

      // Groq Models
      case "llama-3.3-70b-versatile":
      case "llama-3.1-8b-instant":
      case "gemma2-9b-it":
        const groqLimits = MODEL_LIMITS.groq[model];
        const responseGroq = await groq.chat.completions.create({
          model: model,
          messages: [systemMessage, userMessage],
          max_tokens: groqLimits.maxTokens,
        });
        console.log("Groq response:", responseGroq);
        return responseGroq.choices[0].message.content.trim();

      // Gemini Models
      case "gemini-1.5-flash":
      case "gemini-1.5-pro":
      case "text-embedding-004":
        const geminiLimits = MODEL_LIMITS.gemini[model];
        const genAIModel = genAI.getGenerativeModel({ model });
        const geminiResponse = await genAIModel.generateContent({
          prompt,
          maxTokens: geminiLimits.maxTokens,
        });
        console.log("Gemini response:", geminiResponse);
        return geminiResponse.response.text.trim();

      default:
        throw new Error("Unsupported model provided.");
    }
  } catch (error) {
    console.error(`Error generating cold mail for model ${model}:`, error);
    throw error;
  }
}

// Function to extract text from PDF
export async function extractTextFromPDF(pdfPath) {
  console.log("PDF Path:", pdfPath);

  if (!pdfPath) {
    throw new Error("The PDF path is missing or undefined.");
  }

  console.log("Testing File Accessibility...");
  try {
    await fs.promises.access(pdfPath, fs.constants.R_OK);
    console.log("File is accessible.");
  } catch (error) {
    throw new Error(
      `The PDF file does not exist or cannot be accessed: ${error.message}`
    );
  }

  const options = {
    density: 200, // Resolution in DPI
    saveFilename: "temp", // Temporary file name
    savePath: "./", // Temporary file path
    format: "jpeg", // Image format
    width: 800, // Width of the output image
    height: 1200, // Height of the output image
  };

  // Remove unexpected properties
  Object.keys(options).forEach((key) => {
    if (options[key] == null) delete options[key];
  });
  console.log("Sanitized Options:", options);

  const pdfConverter = fromPath(pdfPath, options);
  console.log("PDF Path:", pdfPath);
  console.log("Options Passed to pdfToPic:", options);

  try {
    const firstPage = await pdfConverter(1); // Convert only the first page
    console.log("First Page Output:", firstPage); // Debug the output

    if (!firstPage || !firstPage.path) {
      throw new Error("Failed to generate image from the PDF file.");
    }
    const imgBuffer = await fs.promises.readFile(firstPage.path);
    return imgBuffer.toString("base64");
  } catch (error) {
    console.error("PDF Conversion Error:", error);
    throw new Error(`Error processing PDF file: ${error.message}`);
  }
}

// Extract skills from text
function extractSkillsFromText(text) {
  const skillsRegex =
    /\b(?:JavaScript|TypeScript|Python|React|Next\.js|CSS|HTML|MongoDB|AWS|Docker|Git|Figma|Java|C\+\+|SQL|Node\.js)\b/gi;
  return Array.from(new Set(text.match(skillsRegex) || [])).map((skill) =>
    skill.toLowerCase()
  );
}

// Function to calculate ATS match using AI models
export async function calculateATSMatch(model, jobDescription, resumePath) {
  const resumeBase64 = await extractTextFromPDF(resumePath); // Remove convertOptions
  console.log("Resume Base64 Length:", resumeBase64.length); // Check for unexpected truncation

  const inputPrompt = `
   You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality,
your task is to evaluate the resume against the provided job description and compare key skills. give me the percentage of match if the resume matches
the job description. First the output should come as percentage and then keywords missing and last final thoughts.
    Provide:
    1. Match percentage
    2. Missing skills
    3. Overall evaluation.
  `;

  try {
    let responseText;

    switch (model) {
      // OpenAI Models
      case "gpt-4o-mini":
      case "gpt-3.5-turbo":
        const openAILimits = MODEL_LIMITS.openai[model];
        const responseOpenAI = await openai.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: inputPrompt },
            {
              role: "user",
              content: `${jobDescription}\nResume: ${resumeBase64}`,
            },
          ],
          max_tokens: openAILimits.maxTokens,
        });
        responseText = responseOpenAI.choices[0].message.content.trim();
        break;

      // Groq Models
      case "llama-3.3-70b-versatile":
      case "llama-3.1-8b-instant":
      case "gemma2-9b-it":
        const groqLimits = MODEL_LIMITS.groq[model];
        const responseGroq = await groq.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: inputPrompt },
            {
              role: "user",
              content: `${jobDescription}\nResume: ${resumeBase64}`,
            },
          ],
          max_tokens: groqLimits.maxTokens,
        });
        responseText = responseGroq.choices[0].message.content.trim();
        break;

      // Gemini Models
      case "gemini-1.5-flash":
      case "gemini-1.5-pro":
      case "text-embedding-004":
        const geminiLimits = MODEL_LIMITS.gemini[model];
        const genAIModel = genAI.getGenerativeModel({ model });
        const geminiResponse = await genAIModel.generateContent({
          prompt: `${jobDescription}\nResume: ${resumeBase64}\n${inputPrompt}`,
          maxTokens: geminiLimits.maxTokens,
        });
        responseText = geminiResponse.response.text.trim();
        break;

      default:
        throw new Error("Unsupported model provided.");
    }

    const jobSkills = extractSkillsFromText(jobDescription);
    const resumeSkills = extractSkillsFromText(responseText);

    const missingSkills = jobSkills.filter(
      (skill) => !resumeSkills.includes(skill)
    );
    const matchPercentage =
      ((jobSkills.length - missingSkills.length) / jobSkills.length) * 100;

    console.log("Model Response:", responseText);

    return {
      matchPercentage: parseFloat(matchPercentage.toFixed(2)),
      missingSkills,
      finalThoughts: responseText,
    };
  } catch (error) {
    console.error(`Error calculating ATS match for model ${model}:`, error);
    throw error;
  }
}
