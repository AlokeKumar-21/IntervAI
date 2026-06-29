import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function generateQuestions(role) {
  try {
    const prompt = `
You are a senior technical interviewer.

Generate exactly 5 interview questions for a ${role} position.

Rules:
- Mix technical and behavioral questions.
- Questions should be realistic.
- Return ONLY a numbered list.

Example:
1. Question
2. Question
3. Question
4. Question
5. Question
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);

    return "Failed to generate questions.";
  }
}

export async function evaluateAnswer(
  question,
  answer
) {
  try {
    const prompt = `
You are a FAANG-level interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return ONLY valid JSON.

Format:

{
  "score": 8,
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "improvements": [
    "Tip 1",
    "Tip 2"
  ],
  "idealAnswer": "Ideal answer here"
}
`;

    const result = await model.generateContent(
      prompt
    );

    const text = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    return {
      score: 0,
      strengths: [],
      weaknesses: [],
      improvements: [],
      idealAnswer:
        "Unable to generate feedback.",
    };
  }
}