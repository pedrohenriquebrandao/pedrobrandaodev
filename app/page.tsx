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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    fetch(`${baseUrl}/api/contributions`)
      .then((res) => res.json())
      .then((data) => {
        const calendar =
          data.data.user.contributionsCollection.contributionCalendar;

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

  // Agrupar por semanas de 7 dias
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <main className="mt-10 max-w-3xl mx-auto text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between mb-10">
        <div className="px-4 py-2 rounded-xl bg-indigo-300 text-gray-800 text-md font-bold">
          pedrobrandao.dev
        </div>

        <div className="flex items-center gap-6">
          <a className="hover:underline cursor-pointer text-indigo-300 font-semibold" href="https://github.com/pedrohenriquebrandao" target="_blank">GitHub</a>
          <a className="hover:underline cursor-pointer text-indigo-300 font-semibold" href="https://www.linkedin.com/in/pedrohenriquebrandao/" target="_blank">LinkedIn</a>
        </div>
      </nav>

      {/* HEADER */}
      <section className="flex items-center gap-8 mb-12">
        <img
          src="/avatar.jpeg"
          alt="profile"
          className="w-40 h-40 rounded-full border-6 border-indigo-900"
        />

        <p className="leading-relaxed text-md max-w-xl text-white text-bold">
          Hi, I’m Pedro Brandão! I'm a Computer Engineer currently working at <a href="https://www.primeintech.com.br/" className="text-indigo-300 underline" target="_blank">Prime In-Tech</a>,
          developing software projects. I’m currently building an LMS (Learning Management System) designed for maker-centered learning through hands-on educational robotics,
          as well as supporting company projects in industrial automation.
        </p>
      </section>

      <section className="mb-4 w-3xl mx-auto overflow-x-auto custom-scrollbar">
        {/* LINHA DOS MESES */}
        <div className="flex flex-row gap-[3px] mb-2 justify-start min-w-max">
          {weeks.map((week, i) => {
            if (!week.length) return null;
            const firstDay = week[0];
            const month = monthNames[firstDay.month];

            const showMonth =
              i === 0 ||
              firstDay.month !== weeks[i - 1][0].month;

            return (
              <div key={i} className="w-3 text-[10px] text-indigo-300 text-center">
                {showMonth ? month : ""}
              </div>
            );
          })}
        </div>

        {/* GRID DE CONTRIBUIÇÕES */}
        <div className="flex flex-row gap-[3px] justify-start min-w-max pb-1">
          {weeks.map((week, weekIndex) => {
            const monthChanged =
              weekIndex > 0 &&
              week[0].month !== weeks[weekIndex - 1][0].month;

            return (
              <div key={weekIndex} className="relative">

                {monthChanged && (
                  <div className="absolute -left-[3px] top-0 h-full bg-indigo-800" />
                )}

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
                        className={`w-3 h-3 ${color}`}
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

      <div className="w-3xl mx-auto flex justify-between text-sm font-bold text-white select-none mt-1">
        <span className="tracking-wide text-center sm:text-left">
          {total} contributions in the last year
        </span>

        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-white">Less</span>

          <div className="flex items-center gap-[4px]">
            <div className="w-3 h-3 border-2 border-gray-700 rounded-xs"></div>
            <div className="w-3 h-3 bg-indigo-900 rounded-xs"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-xs"></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-xs"></div>
            <div className="w-3 h-3 bg-indigo-300 rounded-xs"></div>
          </div>

          <span className="text-white">More</span>
        </div>
      </div>

      {/* TECNOLOGIAS */}
      <section className="mb-12 mt-8 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-300">Tech</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "PHP",
            "Laravel",
            "Javascript",
            "MySQL",
            "Docker",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Tailwind CSS",
            "React",
            "Vue",
            "Python",
            "Java"
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-indigo-900 text-white text-sm hover:bg-indigo-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* PUBLISHED PAPERS */}
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
