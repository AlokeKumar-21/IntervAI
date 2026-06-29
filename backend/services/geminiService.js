const GEMINI_MODEL = "gemini-2.5-flash";

async function callGemini(prompt) {
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
  temperature: 0.2,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
},
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();

      console.error("\n========== GEMINI ERROR ==========");
      console.error("Status:", response.status);
      console.error("Response:", errorText);
      console.error("==================================\n");

      throw new Error(`Gemini API Error ${response.status}`);
    }

    const data = await response.json();

    let text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

   const start = text.indexOf("{");
const end = text.lastIndexOf("}");

if (start === -1 || end === -1) {
  console.log("\n========== RAW GEMINI RESPONSE ==========\n");
  console.log(text);
  console.log("\n=========================================\n");

  throw new Error("Invalid JSON returned by Gemini.");
}

text = text.substring(start, end + 1);

//  Log the cleaned JSON before parsing
console.log("\n========== CLEANED GEMINI JSON ==========\n");
console.log(text);
console.log("\n=========================================\n");

try {
  return JSON.parse(text);
} catch (err) {
  console.error("\n========== GEMINI JSON PARSE ERROR ==========\n");
  console.error(text);
  console.error("\n=============================================\n");

  throw new Error("Failed to parse Gemini response.");
}
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Gemini request timed out.");
    }

    throw error;
  }
}

// ======================================================
// Resume Analysis
// ======================================================

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an ATS Resume Reviewer and Senior Technical Recruiter.

Analyze the candidate's resume professionally.

Evaluate:

- ATS compatibility
- Resume formatting
- Technical skills
- Projects
- Experience
- Missing keywords
- Industry relevance

Rules:

- ATS score must be between 0 and 100.
- Give concise summary.
- Suggestions should be actionable.

Return ONLY valid JSON.

{
  "atsScore":0,
  "summary":"",
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestions":[]
}

Resume:

${resumeText}
`;

  return await callGemini(prompt);
};

// ======================================================
// Generate Interview Questions
// ======================================================

export const generateInterviewQuestions = async (
  targetRole,
  resumeText = ""
) => {
  const prompt = `
You are a Senior Software Engineer interviewing candidates at Google, Microsoft and Amazon.

Generate a realistic mock interview.

Target Role:

${targetRole}

Candidate Resume:

${resumeText || "Resume not provided"}

Instructions:

- Generate EXACTLY 10 interview questions.
- Return the questions as a JSON array of strings.
- Each question should be under 30 words.
- Questions must match the target role.
- Personalize the questions using the candidate's resume if available.
- No duplicate questions.
- Avoid generic textbook questions.
- Do not include numbering.
- Do not include explanations.
- Do not include markdown.

Question Distribution:

- 3 Fundamental Questions
- 3 Practical Questions
- 2 Advanced Scenario Questions
- 2 Behavioural Questions

Return ONLY valid JSON.

{
  "questions":[]
}
`;

  const result = await callGemini(prompt);

  return result.questions || [];
};

// ======================================================
// Analyze Interview Answers
// ======================================================

export const analyzeInterviewAnswers = async (
  questions,
  answers
) => {
  const prompt = `
You are a Senior Software Engineering Interviewer.

Evaluate every answer professionally.

Evaluate using:

- Technical accuracy
- Completeness
- Communication
- Practical understanding
- Problem solving

Rules:

- Every question score must be an INTEGER from 0 to 10.
- Technical score must be INTEGER from 0 to 100.
- Communication score must be INTEGER from 0 to 100.
- Overall score must be INTEGER from 0 to 100.
- Give ONE concise feedback sentence (maximum 30 words) for each answer.
- Give exactly 3 concise improvement suggestions.
Maximum 15 words each.

Interview Questions:

${JSON.stringify(questions, null, 2)}

Candidate Answers:

${JSON.stringify(answers, null, 2)}

Return ONLY VALID JSON.
Do not wrap the response in markdown.
Do not omit any closing braces.

{
  "answers":[
    {
      "question":"",
      "score":0,
      "feedback":""
    }
  ],
  "technicalScore":0,
  "communicationScore":0,
  "overallScore":0,
  "suggestions":[
    "",
    "",
    "",
    "",
    ""
  ]
}
`;

  return await callGemini(prompt);
};

