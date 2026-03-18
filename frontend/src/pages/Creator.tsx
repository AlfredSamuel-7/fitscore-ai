// src/pages/Creator.tsx
import React from "react"
import Reveal from "../components/Reveal"

export default function Creator() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white relative overflow-hidden">

      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] bg-indigo-500/20 blur-[80px]" />
        <div className="absolute right-[-140px] top-[160px] w-[400px] h-[400px] bg-cyan-400/20 blur-[90px]" />
      </div>

      <div className="container-max pt-28 pb-20 space-y-20">

        {/* ===== HERO ===== */}
        <Reveal>
          <section className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              ALFRED SAMUEL
            </h1>

            <p className="mt-4 text-lg text-slate-300">
              Full Stack Developer • AI Systems Builder
            </p>

            <p className="mt-2 text-slate-400">
              Chennai, India
            </p>

            <p className="mt-6 text-slate-300 leading-relaxed">
              Final-year Computer Science (AI & ML) student building real-world
              full stack and AI-powered applications focused on practical impact.
            </p>
          </section>
        </Reveal>

        {/* ===== CONTACT COMMAND CENTER ===== */}
        <Reveal delay={120}>
          <section className="max-w-4xl mx-auto">
            <div className="
              p-6 md:p-8 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
            ">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Connect with me
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                <a
                  href="https://alfredsamuelportfoliowebsite.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn"
                >
                  🌐 Portfolio
                </a>

                <a
                  href="https://github.com/AlfredSamuel-7"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn"
                >
                  💻 GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/alfred-samuel-aa0a55249/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn"
                >
                  🔗 LinkedIn
                </a>

                <a
                  href="mailto:alfredsamd7@gmail.com"
                  className="glass-btn"
                >
                  📧 Email
                </a>

                <a
                  href="tel:+919444922150"
                  className="glass-btn"
                >
                  📱 +91 9444922150
                </a>

              </div>
            </div>
          </section>
        </Reveal>

        {/* ===== WHAT I DO ===== */}
        <section className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-10">
              What I Build
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                title: "Full Stack Applications",
                desc: "Building end-to-end web apps using modern frontend and backend technologies.",
              },
              {
                title: "AI-Powered Systems",
                desc: "Integrating ML & NLP into products to solve practical real-world problems.",
              },
              {
                title: "Automation & APIs",
                desc: "Designing backend logic, workflows, and scalable REST API architectures.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 120}>
                <div className="
                  h-full p-6 rounded-2xl
                  bg-white/5 border border-white/10
                  hover:bg-white/10 hover:-translate-y-1
                  transition
                ">
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}

          </div>
        </section>

        {/* ===== CTA ===== */}
        <Reveal delay={120}>
          <section className="text-center max-w-3xl mx-auto pt-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let’s build something impactful.
            </h2>

            <p className="mt-4 text-slate-400">
              Open to entry-level Full Stack Developer and Software Engineer opportunities.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:alfredsamd7@gmail.com"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-400 text-white font-medium hover:opacity-90 transition"
              >
                Contact Me
              </a>

              <a
                href="https://alfredsamuelportfoliowebsite.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10 transition"
              >
                View Portfolio
              </a>
            </div>
          </section>
        </Reveal>

      </div>

      {/* ===== BUTTON STYLE ===== */}
      <style>
        {`
          .glass-btn {
            display:flex;
            align-items:center;
            justify-content:center;
            padding:12px 14px;
            border-radius:12px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.12);
            color:#e2e8f0;
            transition:all .25s ease;
          }
          .glass-btn:hover{
            background:rgba(255,255,255,0.12);
            transform:translateY(-2px);
          }
        `}
      </style>

    </div>
  )
}