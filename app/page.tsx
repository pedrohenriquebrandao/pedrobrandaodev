"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
  month: number;
}

export default function HomePage() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    fetch("/api/contributions")
      .then((res) => res.json())
      .then((data) => {
        const calendar = data.data.user.contributionsCollection.contributionCalendar;

        const allDays = calendar.weeks.flatMap((week: any) =>
          week.contributionDays.map((d: any) => ({
            ...d,
            month: new Date(d.date).getMonth()
          }))
        );

        setDays(allDays);
        setTotal(calendar.totalContributions);
      });
  }, []);

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <main className="mt-10 max-w-3xl mx-auto text-white min-h-screen px-4 sm:px-6 lg:px-0">

      {/* NAVBAR */}
      <nav className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 sm:gap-0">
        <div className="px-4 py-2 rounded-xl bg-indigo-300 text-gray-800 text-md font-bold">
          pedrobrandao.dev
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-end">
          <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white/10 transition" href="https://github.com/pedrohenriquebrandao" target="_blank">
            <span className="inline-flex items-center justify-center w-[22px] h-[22px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.55-3.87-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.74.08-.73.08-.73 1.17.08 1.78 1.2 1.78 1.2 1.04 1.8 2.73 1.28 3.4.98.1-.76.41-1.28.74-1.57-2.55-.29-5.23-1.29-5.23-5.76 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.2a10.8 10.8 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.51 3.17-1.2 3.17-1.2.63 1.59.23 2.76.11 3.05.75.81 1.2 1.85 1.2 3.12 0 4.49-2.69 5.46-5.25 5.75.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
              </svg>
            </span>
            GitHub
          </a>
          <a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white/10 transition" href="https://www.linkedin.com/in/pedrohenriquebrandao/" target="_blank">
            <span className="inline-flex items-center justify-center w-[22px] h-[22px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zm7 0h3.7v1.64h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.6 4.7 5.98V21h-4v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.22V21h-4z" />
              </svg>
            </span>
            LinkedIn
          </a>
        </div>
      </nav>

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row items-center gap-6 mb-12">
        <img
          src="/avatar.jpeg"
          alt="profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 sm:border-6 border-indigo-900"
        />

        <p className="leading-relaxed text-md text-white text-bold max-w-full sm:max-w-xl text-center sm:text-left">
          Hi, I’m Pedro Brandão! I'm a Computer Engineer currently at <a href="https://www.primeintech.com.br/" className="text-indigo-300 underline" target="_blank">Prime In-Tech</a>,
          working on software development, robotics and industrial automation projects.
        </p>
      </section>

      {/* CONTRIBUTIONS GRID */}
      <section className="mb-4 w-full overflow-x-auto custom-scrollbar">
        {/* Month labels */}
        <div className="flex flex-row gap-[3px] mb-2 justify-start min-w-max">
          {weeks.map((week, i) => {
            if (!week.length) return null;
            const firstDay = week[0];
            const month = monthNames[firstDay.month];
            const showMonth = i === 0 || firstDay.month !== weeks[i - 1][0].month;

            return (
              <div key={i} className="w-3 sm:w-4 text-[10px] sm:text-xs text-indigo-300 text-center">
                {showMonth ? month : ""}
              </div>
            );
          })}
        </div>

        {/* Contribution squares */}
        <div className="flex flex-row gap-[3px] justify-start min-w-max pb-1">
          {weeks.map((week, weekIndex) => {
            const monthChanged = weekIndex > 0 && week[0].month !== weeks[weekIndex - 1][0].month;

            return (
              <div key={weekIndex} className="relative">
                {monthChanged && <div className="absolute -left-[3px] top-0 h-full bg-indigo-800" />}
                <div className="flex flex-col gap-[3px]">
                  {week.map((day, i) => {
                    const count = day.contributionCount;
                    let color = "border-2 border-gray-700 rounded-xs";
                    if (count > 0) color = "bg-indigo-900 rounded-xs";
                    if (count > 3) color = "bg-indigo-500 rounded-xs";
                    if (count > 6) color = "bg-indigo-400 rounded-xs";
                    if (count > 9) color = "bg-indigo-300 rounded-xs";

                    return (
                      <div
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${color}`}
                        title={`${day.date}: ${count} contributions`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contributions legend */}
      <div className="w-full flex flex-col sm:flex-row justify-between text-sm font-bold text-white select-none mt-1 gap-2 sm:gap-0">
        <span className="tracking-wide text-center sm:text-left">
          {total} contributions in the last year
        </span>

        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-white">Less</span>
          <div className="flex items-center gap-[4px]">
            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-700 rounded-xs"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-900 rounded-xs"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-500 rounded-xs"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-400 rounded-xs"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-300 rounded-xs"></div>
          </div>
          <span className="text-white">More</span>
        </div>
      </div>

      {/* Tech stack */}
      <section className="mb-12 mt-8 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-300">Tech</h2>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
          {[
            "PHP","Laravel","Javascript","MySQL","Docker","Next.js","Node.js",
            "PostgreSQL","Tailwind CSS","React","Vue","Python","Java","Linux"
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-indigo-900 text-white text-xs sm:text-sm hover:bg-indigo-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Published papers */}
      <section className="mb-12 mt-8 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-300">Published Papers</h2>

        <div>
          <a
            href="https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/37149"
            target="_blank"
            className="text-white text-sm transition-colors underline"
          >
            LínguaQuiz: Integração de Reconhecimento de Imagens e LLM em um Jogo para Terapia de Fala
          </a>
        </div>
      </section>

    </main>
  );
}
