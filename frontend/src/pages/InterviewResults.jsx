import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Trophy,
  Brain,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

import { getInterview } from "../services/interviewService";

export default function InterviewResults() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    loadInterview();
  }, []);

  const loadInterview = async () => {
    try {
      const data = await getInterview(id);
      setInterview(data.interview);
    } catch (err) {
      console.error(err);
     toast.error("Failed to load interview results.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xl font-semibold transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        Loading Results...
      </div>
    );
  }

  const feedback = interview.overallFeedback;

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Interview Results
          </h1>

          <p className="mt-2 text-white/80">
            AI-powered feedback for your mock interview.
          </p>

        </div>

        {/* Scores */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">
            <Trophy className="text-yellow-500" />

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Overall Score
            </p>

            <h1 className="mt-2 text-5xl font-bold dark:text-white">
              {feedback.overallScore}
            </h1>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">
            <Brain className="text-indigo-600" />

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Technical
            </p>

            <h1 className="mt-2 text-5xl font-bold dark:text-white">
              {feedback.technicalScore}
            </h1>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">
            <MessageSquare className="text-blue-600" />

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Communication
            </p>

            <h1 className="mt-2 text-5xl font-bold dark:text-white">
              {feedback.communicationScore}
            </h1>
          </div>

        </div>

        {/* Suggestions */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

          <div className="flex items-center gap-2">

            <Lightbulb className="text-amber-500" />

            <h2 className="text-2xl font-semibold dark:text-white">
              AI Suggestions
            </h2>

          </div>

          {feedback.suggestions.length ? (
            <div className="mt-5 space-y-4">

              {feedback.suggestions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/30 dark:text-slate-200"
                >
                  {item}
                </div>
              ))}

            </div>
          ) : (
            <p className="mt-5 text-slate-500 dark:text-slate-400">
              No suggestions available.
            </p>
          )}

        </div>

               {/* Question Feedback */}

        <div className="mt-8 space-y-6">

          {interview.answers.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900"
            >

              <h2 className="font-semibold dark:text-white">
                Question {index + 1}
              </h2>

              <p className="mt-3 dark:text-slate-300">
                {item.question}
              </p>

              <div className="mt-6 rounded-xl bg-slate-100 p-4 transition-colors duration-300 dark:bg-slate-800">

                <p className="font-medium dark:text-white">
                  Your Answer
                </p>

                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <p className="font-semibold dark:text-white">
                    AI Feedback
                  </p>

                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {item.aiFeedback}
                  </p>

                </div>

                <div className="rounded-xl bg-indigo-100 px-5 py-3 font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">

                  {item.score}/10

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}