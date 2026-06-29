
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getInterview,
  submitInterview,
} from "../services/interviewService";

export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    loadInterview();
  }, []);

  const loadInterview = async () => {
    try {
      const data = await getInterview(id);

      setInterview(data.interview);

      const initialAnswers = data.interview.questions.map((question) => ({
        question,
        answer: "",
      }));

      setAnswers(initialAnswers);
    } catch (err) {
      console.error(err);
     toast.error("Failed to load interview.");
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = (value) => {
    const updated = [...answers];
    updated[currentQuestion].answer = value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const unanswered = answers.some(
      (item) => !item.answer.trim()
    );

    if (unanswered) {
     toast("Please answer all questions.");
      return;
    }

    try {
      setSubmitting(true);

      await submitInterview(id, answers);

    toast.success("Interview submitted successfully.");
      navigate(`/interview/${id}/results`);
    } catch (err) {
      console.error(err);
     toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xl font-semibold transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        Loading Interview...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold dark:text-white">
                {interview.targetRole}
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Difficulty: {interview.difficulty}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-100 px-4 py-2 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              Question {currentQuestion + 1} / {interview.questions.length}
            </div>

          </div>

          <div className="mt-10 rounded-2xl bg-slate-100 p-6 transition-colors duration-300 dark:bg-slate-800">

            <h2 className="text-xl font-semibold dark:text-white">
              {interview.questions[currentQuestion]}
            </h2>

          </div>

          <textarea
            rows={10}
            placeholder="Type your answer here..."
            value={answers[currentQuestion]?.answer || ""}
            onChange={(e) => updateAnswer(e.target.value)}
            className="mt-6 w-full rounded-2xl border border-slate-300 bg-white p-4 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
          />

          <div className="mt-8 flex justify-between">

            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 transition-all duration-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion === interview.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
  <>
    <Loader2 className="h-5 w-5 animate-spin" />
    Submitting...
  </>
) : (
  <>
    <Send size={18} />
    Submit Interview
  </>
)}
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
              >
                Next
                <ArrowRight size={18} />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
