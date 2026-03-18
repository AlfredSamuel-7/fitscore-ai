// src/sections/HowItWorks.tsx
import React from "react"
import Reveal from "../components/Reveal"

const steps = [
  {
    title: "Paste your resume",
    desc: "Insert your resume text to represent your current skills and professional experience.",
  },
  {
    title: "Paste the job description",
    desc: "Add the job description for the role you are targeting so FitScore AI can extract relevant requirements.",
  },
  {
    title: "Contextual AI analysis",
    desc: "FitScore AI converts both texts into vector embeddings using transformer models and computes semantic similarity.",
  },
  {
    title: "Review match breakdown",
    desc: "View your overall match score, semantic alignment, skill coverage, matched skills, and missing skills — all transparently calculated.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <div className="container-max">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How FitScore AI works
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A transparent, AI-driven evaluation process built on semantic
            similarity and structured skill analysis.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div
                className="
                  h-full p-6 rounded-2xl
                  bg-white/5 border border-white/10
                  backdrop-blur-md
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition
                  text-center
                "
              >
                {/* Step circle */}
                <div className="
                  w-12 h-12 mx-auto
                  rounded-full
                  flex items-center justify-center
                  bg-gradient-to-br from-primary-500/40 to-cyan-400/30
                  text-white font-semibold
                  shadow-lg
                ">
                  {i + 1}
                </div>

                <h3 className="mt-4 text-white font-semibold">
                  {s.title}
                </h3>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  )
}