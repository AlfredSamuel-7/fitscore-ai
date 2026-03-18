// src/sections/Features.tsx
import React from "react"
import Reveal from "../components/Reveal"

const features = [
  {
    title: "Contextual Resume–Job Matching",
    desc: "Uses transformer-based sentence embeddings to measure semantic similarity between your resume and the job description — not just keyword overlap.",
    icon: "🧠",
  },
  {
    title: "Targeted Skill Gap Detection",
    desc: "Identifies which skills mentioned in the job description are missing from your resume using controlled skill extraction.",
    icon: "🔎",
  },
  {
    title: "Transparent Weighted Match Score",
    desc: "Generates a final score using a 60% semantic similarity and 40% skill coverage weighting model for explainable evaluation.",
    icon: "📊",
  },
  {
    title: "Actionable Improvement Insights",
    desc: "Provides structured recommendations based on missing skills so you know exactly what to strengthen for your target role.",
    icon: "📌",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container-max">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white">
            What FitScore AI does
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            FitScore AI evaluates how well your resume aligns with a job
            description using contextual AI and structured skill analysis —
            built for transparency and accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <article className="transition-all duration-500">
                <div
                  className="
                    group h-full p-6 rounded-2xl
                    bg-white/5 border border-white/10
                    backdrop-blur-md
                    hover:bg-white/10 hover:-translate-y-1
                    transition
                  "
                >
                  <div className="flex gap-4">
                    <div
                      className="
                        w-12 h-12 rounded-xl
                        flex items-center justify-center
                        bg-gradient-to-br from-primary-500/30 to-cyan-400/20
                      "
                    >
                      {f.icon}
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {f.title}
                      </h3>

                      <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}