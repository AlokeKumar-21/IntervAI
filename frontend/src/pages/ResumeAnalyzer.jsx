import { useState, useEffect } from "react";
import {
  Upload,
  Sparkles,
  FileText,
  Loader2,
} from "lucide-react";
import { Check, Eye, Trash2 } from "lucide-react";
import { removeResume } from "../services/resumeService";

import ATSCard from "../components/resume/ATSCard";
import { useProfile } from "../hooks/useProfile";
import toast from "react-hot-toast";
import { analyzeResume } from "../services/resumeService";

export default function ResumeAnalyzer() {
  const { profile, uploadCV, reload } = useProfile();

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(
    profile?.resumeAnalysis || null
  );
  useEffect(() => {
  if (profile?.resumeAnalysis) {
    setAnalysis(profile.resumeAnalysis);
  }
}, [profile]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      await uploadCV(file);

      await reload();

      toast.success("Resume uploaded successfully.");

    } catch (err) {
      console.error(err);
     toast.error("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const result = await analyzeResume();

      setAnalysis(result.analysis);

      await reload();

     toast.success("Resume analyzed successfully.");

    } catch (err) {
      console.error(err);
     toast.error("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveResume = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to remove your resume?"
  );

  if (!confirmDelete) return;

  try {
    setLoading(true);

    await removeResume();

    await reload();

    setAnalysis(null);

    toast.success("Resume removed successfully.");
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove resume.");
  } finally {
    setLoading(false);
  }
};
   //  ADD IT HERE
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");


  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      <div className="mx-auto max-w-7xl px-8 py-8">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
  📄 AI Resume Analyzer
</h1>

          <p className="mt-2 text-white/80">
            Upload your resume to receive an ATS score, personalized feedback, and AI-powered improvement suggestions.
          </p>

        </div>

        {/* Top Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Upload Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

            <div className="flex items-center gap-2">

              <Upload className="text-indigo-600" />

            <h2 className="text-xl font-semibold dark:text-white">
                Upload Resume
              </h2>

            </div>

           <p className="mt-3 text-slate-500 dark:text-slate-400">
              Upload your latest PDF resume.
            </p>

            <label className="mt-6 flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-indigo-300 px-6 py-8 transition-all duration-300 hover:bg-indigo-50 dark:border-slate-600 dark:hover:bg-slate-800">

              <Upload />

              <span className="font-medium">
                Choose Resume
              </span>

              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={handleUpload}
              />

            </label>
            {profile?.resume && (
  <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      {/* Resume Info */}
      <div className="flex min-w-0 items-center gap-3">
        <Check className="h-8 w-8 shrink-0 text-green-600" />

        <div className="min-w-0">
          <h3 className="font-semibold text-green-700 dark:text-green-300">
            Resume Uploaded
          </h3>

         <p className="truncate text-sm text-slate-600 dark:text-slate-400">
  {profile?.resumeOriginalName || "PDF Resume"}
</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
        <a
          href={`${BASE_URL}/${profile.resume}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Eye size={16} />
          View Resume
        </a>

        <button
          onClick={handleRemoveResume}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-500 px-5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  </div>
)}

           
            <button
  onClick={handleAnalyze}
  disabled={loading}
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      Analyzing Resume...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Analyze Resume
    </>
  )}
</button>

          </div>

          {/* ATS Card */}

          <ATSCard score={analysis?.atsScore || 0} />

          {/* Summary */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

  <div className="flex items-center gap-2">
              <FileText className="text-indigo-600" />

              <h2 className="text-xl font-semibold dark:text-white">
                AI Summary
              </h2>

            </div>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">

              {analysis?.summary ||

                "Upload and analyze your resume to generate an AI summary."}

            </p>

          </div>

        </div>
                {/* Strengths & Weaknesses */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Strengths */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-2xl font-semibold text-green-700">
              💪 Strengths
            </h2>

            {analysis?.strengths?.length ? (
              <ul className="mt-5 space-y-3">

                {analysis.strengths.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-green-50 p-4 text-slate-700 dark:bg-green-950/40 dark:text-slate-200"
                  >
                    ✓ {item}
                  </li>
                ))}

              </ul>
            ) : (
              <p className="mt-5 text-slate-500 dark:text-slate-400">
                No strengths available yet.
              </p>
            )}

          </div>

          {/* Weaknesses */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-2xl font-semibold text-red-600">
              ⚠ Weaknesses
            </h2>

            {analysis?.weaknesses?.length ? (
              <ul className="mt-5 space-y-3">

                {analysis.weaknesses.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-red-50 p-4 text-slate-700 dark:bg-red-950/40 dark:text-slate-200"
                  >
                    • {item}
                  </li>
                ))}

              </ul>
            ) : (
              <p className="mt-5 text-slate-500 dark:text-slate-400">
                No weaknesses available yet.
              </p>
            )}

          </div>

        </div>
                {/* Missing Skills */}

        <div className="mt-8 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-amber-600">
            📚 Missing Skills
          </h2>

          {analysis?.missingSkills?.length ? (
            <div className="mt-5 flex flex-wrap gap-3">

              {analysis.missingSkills.map((skill, index) => (
                <span
                  key={index}
                 className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {skill}
                </span>
              ))}

            </div>
          ) : (
            <p className="mt-5 text-slate-500 dark:text-slate-400">
              No missing skills detected.
            </p>
          )}

        </div>

        {/* Suggestions */}

        <div className="mt-8 rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-indigo-600">
            💡 AI Suggestions
          </h2>

          {analysis?.suggestions?.length ? (
            <div className="mt-5 space-y-4">

              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-indigo-50 p-4 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {suggestion}
                </div>
              ))}

            </div>
          ) : (
            <p className="mt-5 text-slate-500 dark:text-slate-400">
              No suggestions available.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}