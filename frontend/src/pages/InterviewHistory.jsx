import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Trophy, Briefcase, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getInterviewHistory } from "../services/interviewService";

export default function InterviewHistory() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getInterviewHistory();
      setHistory(data.interviews);
    } catch (err) {
      console.error(err);
     toast.error("Failed to load interview history.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      <p className="font-medium text-slate-600 dark:text-slate-300">
        Loading Interview History...
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Interview History
          </h1>

          <p className="mt-2 text-white/80">
            View all your previous AI mock interviews and revisit your results.
          </p>

        </div>

        {history.length === 0 ? (
  <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

    <h2 className="text-2xl font-semibold dark:text-white">
      No Interviews Yet
    </h2>

    <p className="mt-3 text-slate-500 dark:text-slate-400">
      Generate your first AI interview to see your history here.
    </p>

    <button
      onClick={() => navigate("/interview")}
      className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700"
    >
      Start Interview
    </button>

  </div>
) : (
          <div className="mt-8 space-y-5">

            {history.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900"
              >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <Briefcase
                        size={18}
                        className="text-indigo-600"
                      />

                      <h2 className="text-xl font-semibold dark:text-white">
                        {item.targetRole}
                      </h2>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">

                      <span>
                        Difficulty: <strong>{item.difficulty}</strong>
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={15} />

                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-6">

                    <div className="rounded-xl bg-green-100 px-5 py-3 text-center dark:bg-green-900/40">

                      <div className="flex items-center justify-center gap-1">

                        <Trophy
                          size={18}
                          className="text-green-700 dark:text-green-300"
                        />

                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Score
                        </span>

                      </div>

                      <h3 className="mt-2 text-2xl font-bold text-green-700 dark:text-green-300">
                        {item.overallFeedback?.overallScore ?? 0}
                      </h3>

                    </div>

                    <button
                      onClick={() =>
                        navigate(`/interview/${item._id}/results`)
                      }
                      className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
                    >
                      View Results
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}