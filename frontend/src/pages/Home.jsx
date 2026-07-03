import { useState } from "react";

import { generateQuestions, evaluateAnswer } from "../services/gemini";
import { formatQuestions } from "../utils/helpers";

import RoleInput from "../components/interview/RoleInput";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import FeedbackCard from "../components/interview/FeedbackCard";

export default function Home() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);

  // GENERATE QUESTIONS
  const handleGenerate = async () => {
    setLoading(true);

    const res = await generateQuestions(role);
    const list = formatQuestions(res);

    setQuestions(list);
    setLoading(false);
  };

  // EVALUATE ANSWERS
  const handleEvaluate = async (question, index) => {
    const res = await evaluateAnswer(
      question,
      answers[index] || ""
    );

    setFeedback({
      ...feedback,
      [index]: res,
    });
  };

  return (
    <div>

      {/* ROLE INPUT */}
      <RoleInput
        role={role}
        setRole={setRole}
        onGenerate={handleGenerate}
        loading={loading}
      />

      {/* QUESTIONS */}
      {questions.map((q, i) => (
        <div key={i} className="mb-6">

          {/* QUESTION */}
          <QuestionCard question={q} />

          {/* ANSWER */}
          <AnswerBox
            value={answers[i] || ""}
            onChange={(val) =>
              setAnswers({ ...answers, [i]: val })
            }
          />

          {/* EVALUATE BUTTON */}
          <button
            onClick={() => handleEvaluate(q, i)}
            className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Evaluate Answer
          </button>

          {/* FEEDBACK */}
          {feedback[i] && (
            <FeedbackCard feedback={feedback[i]} />
          )}

        </div>
      ))}

    </div>
  );
}