export default function ATSCard({ score = 0 }) {
  const getColor = () => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      <p className="text-slate-500 dark:text-slate-400">
        ATS Score
      </p>

      <h1 className={`mt-3 text-5xl font-bold ${getColor()}`}>
        {score}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        out of 100
      </p>

    </div>
  );
}