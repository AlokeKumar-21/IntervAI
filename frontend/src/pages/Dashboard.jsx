import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../hooks/useProfile";
import { fetchDashboardData } from "../services/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();

  const { profile, loading } = useProfile();

  const [dashboard, setDashboard] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      loadDashboard();
    }
  }, [profile]);

  const loadDashboard = async () => {
    try {
      setDashboardLoading(true);

      const data = await fetchDashboardData(profile);

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDashboardLoading(false);
    }
  };

  if (loading || dashboardLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xl font-semibold text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Resume Uploaded",
      value: dashboard.profile.resume ? "Yes" : "No",
      icon: "📄",
    },
    {
      title: "ATS Score",
      value:
        dashboard.profile.resumeAnalysis?.atsScore ?? "--",
      icon: "📊",
    },
    {
      title: "Interviews",
      value: dashboard.interviewsTaken,
      icon: "🎤",
    },
    {
      title: "Best Score",
      value: dashboard.bestScore,
      icon: "🏆",
    },
  ];

  return (
   <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 shadow-xl">

          <div className="relative z-10">
            <p className="text-sm text-white/80">
              Welcome Back 👋
            </p>

            <h1 className="mt-2 text-5xl font-bold text-white">
  Welcome back, {dashboard.profile.fullName}! 👋
</h1>

            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Track your interview performance, improve your ATS score, and prepare confidently for your next opportunity with AI-powered insights.
            </p>

            <button
  onClick={() => navigate("/interview")}
  className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  Start Interview →
</button>
          </div>

        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
             className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">
                  {stat.icon}
                </span>

                
              </div>

             <h3 className="mt-5 text-slate-500 dark:text-slate-400">
                {stat.title}
              </h3>

             <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}

        </div>

                {/* Bottom Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Resume Analysis */}

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 lg:col-span-2 dark:border-slate-700 dark:bg-slate-900">

  <h2 className="text-2xl font-semibold dark:text-white">
    Resume Analysis
  </h2>

  {dashboard.profile.resumeAnalysis ? (
    <>
      <div className="mt-6 flex items-center justify-between">

        <div>
          <p className="text-slate-500 dark:text-slate-400">
            ATS Score
          </p>

          <h1 className="mt-2 text-5xl font-bold text-indigo-600">
            {dashboard.profile.resumeAnalysis.atsScore}
          </h1>
        </div>

        <button
          onClick={() => navigate("/resume")}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
        >
          View Resume
        </button>

      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-5 transition-colors duration-300 dark:bg-slate-800">

        <h3 className="font-semibold dark:text-white">
          AI Summary
        </h3>

        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          {dashboard.profile.resumeAnalysis.summary}
        </p>

      </div>
    </>
  ) : (
    <div className="mt-6">

      <p className="text-slate-500 dark:text-slate-400">
        No resume analysis found.
      </p>

      <button
        onClick={() => navigate("/resume")}
        className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
      >
        Analyze Resume
      </button>

    </div>
  )}

</div>
          {/* Latest Interview */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-2xl font-semibold dark:text-white">
              Latest Interview
            </h2>

            {dashboard.latestInterview ? (
              <>

                <div className="mt-6">

                  <p className="text-slate-500 dark:text-slate-400">
                    Target Role
                  </p>

                  <h3 className="mt-2 text-xl font-semibold dark:text-white">
                    {dashboard.latestInterview.targetRole}
                  </h3>

                </div>

                <div className="mt-6">

                 <p className="text-slate-500 dark:text-slate-400">
                    Difficulty
                  </p>

                  <h3 className="mt-2 text-lg font-semibold dark:text-white">
                    {dashboard.latestInterview.difficulty}
                  </h3>

                </div>

                <div className="mt-6">

                  <p className="text-slate-500 dark:text-slate-400">
                    Overall Score
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-green-600">
                    {dashboard.latestInterview.overallFeedback?.overallScore ?? 0}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/interview/${dashboard.latestInterview._id}/results`
                    )
                  }
                  className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                >
                  View Results
                </button>

              </>
            ) : (

              <div className="mt-8">

               <p className="text-slate-500 dark:text-slate-400">
                  No interviews taken yet.
                </p>

                <button
                  onClick={() => navigate("/interview")}
                  className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Start Interview
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}