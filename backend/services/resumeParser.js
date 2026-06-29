import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractResumeText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text.trim();
  } catch (error) {
    console.error("Resume Parsing Error:", error);
    throw new Error("Failed to parse resume.");
  }
};