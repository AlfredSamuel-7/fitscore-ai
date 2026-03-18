// src/sections/HeroUltra.tsx
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getHistory } from "../lib/api"
import { HistoryItem } from "../types"

export default function HeroUltra() {
  const [latest, setLatest] = useState<HistoryItem | null>(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const history = await getHistory()
        if (history && history.length > 0) {
          setLatest(history[0])
        }
      } catch {
        // not logged in
      }
    }

    fetchLatest()
  }, [])

  const score = latest?.match_score ?? null
  const topSkills = latest?.skills_in_resume?.slice(0, 4) ?? []

  const getRoles = () => {
    if (!latest) return []

    const roles: string[] = []

    if (latest.skills_in_resume.includes("React"))
      roles.push("Frontend Developer")

    if (latest.skills_in_resume.includes("Python"))
      roles.push("Python Developer")

    if (latest.skills_in_resume.includes("Machine Learning"))
      roles.push("AI / ML Engineer")

    if (latest.skills_in_resume.includes("Node.js"))
      roles.push("Backend Developer")

    return roles
  }

  const roles = getRoles()

  return (
    <section className="relative overflow-hidden pt-28 pb-24 flex items-center">

      {/* ===== CLEAN BACKGROUND (MATCH LANDING) ===== */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#06070b] via-[#0b0f19] to-[#0f172a]" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[160px]" />
      </div>

      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              Transformer-Based AI
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">
                Contextual Resume Matching
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                Built for Precision
              </span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-xl leading-relaxed">
              FitScore AI evaluates resume–job alignment using semantic embeddings
              and structured skill gap analysis — delivering transparent,
              weighted scoring you can trust.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                Analyze Your Resume →
              </Link>

              <a
                href="#features"
                className="px-6 py-3 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 transition"
              >
                Learn More
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Built with FastAPI · React · Sentence Transformers
            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative group">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-cyan-400/20 blur-xl opacity-40 group-hover:opacity-60 transition" />

            <div className="relative transition-transform duration-500 group-hover:-translate-y-2">

              <div
                className="
                  p-8
                  rounded-3xl
                  bg-gradient-to-br from-[#0f172a] to-[#111827]
                  border border-white/10
                  shadow-2xl
                "
              >

                <div className="flex items-center justify-between">

                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">
                      Profile Strength
                    </div>

                    <div className="mt-3 text-6xl font-extrabold text-white">
                      {score !== null ? `${score}%` : "--"}
                    </div>

                    {latest && (
                      <div className="mt-2 text-sm text-slate-400">
                        Semantic {latest.semantic_score}% · Skill Coverage {latest.skill_coverage}%
                      </div>
                    )}
                  </div>

                  {score !== null && (
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={251}
                          strokeDashoffset={251 - (score / 100) * 251}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#22d3ee" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  )}

                </div>

                <div className="my-6 border-t border-white/10" />

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                    Top Skills
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {topSkills.length > 0 ? (
                      topSkills.map((s) => (
                        <span
                          key={s}
                          className="
                            px-3 py-1
                            rounded-full
                            bg-indigo-500/10
                            text-indigo-300
                            text-xs
                            border border-indigo-500/20
                          "
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">
                        No analysis yet
                      </span>
                    )}
                  </div>
                </div>

                <div className="my-6 border-t border-white/10" />

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                    Matched Roles
                  </div>

                  <div className="text-sm text-white font-medium">
                    {roles.length > 0 ? roles.join(" · ") : "—"}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}