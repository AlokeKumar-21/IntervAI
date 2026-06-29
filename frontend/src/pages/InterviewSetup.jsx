import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Sparkles, Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { generateInterview } from "../services/interviewService";

export default function InterviewSetup() {
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!targetRole.trim()) {
      toast("Please enter a target role.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateInterview({
        targetRole,
        difficulty,
      });

     toast.success("Interview generated successfully.");

      navigate(`/interview/${data.interview._id}`);
    } catch (err) {
      console.error(err);
     toast.error("Failed to generate interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">
            AI Practice Interview
          </h1>

          <p className="mt-3 text-white/80">
            Generate personalized interview questions based on your desired
            role and receive AI-powered feedback.
          </p>
        </div>

        {/* Setup Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900" >
          <div className="flex items-center gap-2">
            <Briefcase className="text-indigo-600" />

            <h2 className="text-2xl font-semibold dark:text-white">
              Interview Setup
            </h2>
          </div>

          {/* Role */}

          <div className="mt-8">
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Target Role
            </label>

            <input
              type="text"
              placeholder="Frontend Developer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Difficulty */}

          <div className="mt-6">
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Button */}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
  <>
    <Loader2 className="h-5 w-5 animate-spin" />
    Generating Interview...
  </>
) : (
  <>
    <Sparkles size={18} />
    Generate Interview
  </>
)}
          </button>
        </div>
      </div>
    </div>
  );
}