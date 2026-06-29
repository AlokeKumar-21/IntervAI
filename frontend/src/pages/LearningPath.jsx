export default function Learning() {
  const roadmap = [
    {
      title: "HTML & CSS",
      progress: 100,
      status: "Completed",
      color: "bg-green-500",
    },
    {
      title: "JavaScript",
      progress: 85,
      status: "In Progress",
      color: "bg-indigo-500",
    },
    {
      title: "React",
      progress: 70,
      status: "In Progress",
      color: "bg-indigo-500",
    },
    {
      title: "System Design",
      progress: 30,
      status: "Pending",
      color: "bg-amber-500",
    },
    {
      title: "Behavioral Interviews",
      progress: 55,
      status: "In Progress",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-xl">

          <p className="text-white/80">
            Personalized Learning Journey 🚀
          </p>

          <h1 className="mt-2 text-5xl font-bold text-white">
  Learning Path
</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Follow your AI-generated roadmap and
            prepare systematically for interviews.
          </p>

        </div>

        {/* Overview Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

            <h3 className="text-slate-500">
              Overall Progress
            </h3>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              68%
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

            <h3 className="text-slate-500">
              Skills Completed
            </h3>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              12
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

            <h3 className="text-slate-500">
              Recommended Focus
            </h3>

            <p className="mt-2 text-xl font-semibold text-indigo-600">
              System Design
            </p>

          </div>

        </div>

        {/* Roadmap */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

          <h2 className="text-2xl font-semibold text-slate-900">
            Learning Roadmap
          </h2>

          <div className="mt-8 space-y-6">

            {roadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.status}
                    </p>
                  </div>

                  <span className="font-semibold text-slate-700">
                    {item.progress}%
                  </span>

                </div>

                <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-slate-700">

                  <div
                    className={`h-3 rounded-full ${item.color}`}
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Bottom Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* AI Recommendations */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 lg:col-span-2 dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-xl font-semibold text-slate-900">
              AI Recommendations
            </h2>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-indigo-50 p-4 transition-colors duration-300 dark:bg-indigo-900/20">
                <h3 className="font-semibold text-indigo-700">
                  System Design
                </h3>

                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Focus on scalability, load balancing,
                  caching, and database sharding concepts.
                </p>
              </div>

              <div className="rounded-xl bg-cyan-50 p-4 transition-colors duration-300 dark:bg-cyan-900/20">
                <h3 className="font-semibold text-cyan-700">
                  React Optimization
                </h3>

                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Revise memoization, lazy loading,
                  and rendering optimization techniques.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4 transition-colors duration-300 dark:bg-amber-900/20">
                <h3 className="font-semibold text-amber-700">
                  Behavioral Round
                </h3>

                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Practice STAR-based answers
                  for leadership and teamwork questions.
                </p>
              </div>

            </div>

          </div>

          {/* Weekly Goal */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-xl font-semibold text-slate-900">
              Weekly Goal
            </h2>

            <div className="mt-5">

              <p className="text-slate-600">
                Complete 3 learning modules
              </p>

              <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-slate-700">

                <div className="h-3 w-[66%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"></div>

              </div>

              <p className="mt-2 text-sm text-slate-500">
                2 of 3 modules completed
              </p>

            </div>

            <button className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg">
              Continue Learning
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}