// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import ResumeUpload from "../components/ResumeUpload"
import { getHistory } from "../lib/api"
import { AnalyzeResult, HistoryItem } from "../types"

export default function Dashboard() {
  const { user, loading, signout } = useAuth()

  const [analysis, setAnalysis] = useState<AnalyzeResult | null>(() => {
    const saved = localStorage.getItem("last_analysis")
    return saved ? JSON.parse(saved) : null
  })

  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory()
        setHistory(data.slice(0, 5))
      } catch {
        console.error("Failed to load history")
      }
    }

    if (user) fetchHistory()
  }, [user])

  if (loading) return <div className="mt-20 text-center text-slate-400">Loading...</div>
  if (!user) return <div className="mt-20 text-center text-slate-400">Please sign in.</div>

  const score = analysis?.match_score ?? 0

  const scoreStatus =
    score >= 80
      ? { label: "Strong Alignment", color: "text-green-400" }
      : score >= 60
      ? { label: "Moderate Match", color: "text-yellow-400" }
      : { label: "Needs Improvement", color: "text-red-400" }

  return (
    <div className="container-max py-16">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ================= EXECUTIVE SUMMARY ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 to-cyan-900/30 border border-white/10 p-12 shadow-2xl">

          <div className="flex justify-between items-start flex-wrap gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Welcome back, {user.name}
              </h2>
              <p className="text-slate-400 mt-2">
                AI Resume–Job Intelligence Overview
              </p>
            </div>

            <button
              onClick={signout}
              className="px-5 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
            >
              Sign out
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">

            {/* Score */}
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Match Score
              </div>

              <div className="flex items-end gap-4 mt-3">
                <span className="text-7xl font-extrabold text-white">
                  {analysis ? `${score}%` : "--"}
                </span>
                {analysis && (
                  <span className={`text-sm font-semibold ${scoreStatus.color}`}>
                    {scoreStatus.label}
                  </span>
                )}
              </div>

              {analysis && (
                <div className="mt-6 grid grid-cols-2 gap-6 text-sm text-slate-400">
                  <div>
                    <div className="text-white font-semibold">
                      {analysis.semantic_score}%
                    </div>
                    Semantic Similarity
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {analysis.skill_coverage}%
                    </div>
                    Skill Coverage
                  </div>
                </div>
              )}
            </div>

            {/* Progress Ring */}
            <div className="relative w-56 h-56 mx-auto">
              <div className="absolute inset-0 rounded-full bg-white/5" />
              <div
                className="absolute inset-0 rounded-full border-4 border-indigo-500/40"
                style={{
                  clipPath: `inset(${100 - score}% 0 0 0)`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {analysis ? `${score}%` : "--"}
              </div>
            </div>

          </div>
        </section>

        {/* ================= ANALYSIS CONSOLE ================= */}
        <section className="space-y-16">

          {/* Resume vs JD FULL WIDTH */}
          <div>
            <ResumeUpload
              onUploaded={(data) => {
                setAnalysis(data)
                localStorage.setItem("last_analysis", JSON.stringify(data))
              }}
            />
          </div>

          {/* Strategic Workflow (Redesigned) */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0f172a] p-12">

            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-white">
                Strategic Improvement Workflow
              </h3>
              <p className="text-slate-400 mt-3 text-sm">
                Follow a structured loop to continuously improve resume–job alignment.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-4 gap-8">

              {[
                "Paste resume & job description",
                "AI evaluates contextual similarity",
                "Review skill gaps strategically",
                "Re-run analysis to increase score"
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-semibold mb-4">
                    {index + 1}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* ================= SKILL INTELLIGENCE ================= */}
        {analysis && (
          <section className="grid md:grid-cols-2 gap-10">

            {/* Matched */}
            <div className="rounded-3xl p-8 bg-green-900/10 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-300 mb-6">
                Strength Signals
              </h3>

              <div className="flex flex-wrap gap-3">
                {analysis.skills_in_resume.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="rounded-3xl p-8 bg-red-900/10 border border-red-500/20">
              <h3 className="text-lg font-semibold text-red-300 mb-6">
                Improvement Areas
              </h3>

              {analysis.missing_skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {analysis.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">
                  Excellent. No critical skill gaps detected.
                </p>
              )}
            </div>

          </section>
        )}

        {/* ================= CAREER SIGNALS ================= */}
        {analysis && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-8">
              Career Signals
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Frontend */}
              {(analysis.skills_in_resume.includes("React") ||
                analysis.skills_in_resume.includes("JavaScript") ||
                analysis.skills_in_resume.includes("HTML") ||
                analysis.skills_in_resume.includes("CSS")) && (
                <div className="p-8 rounded-3xl bg-indigo-900/20 border border-indigo-500/30 hover:scale-105 transition">
                  Frontend Developer
                </div>
              )}

              {/* Backend */}
              {(analysis.skills_in_resume.includes("Node.js") ||
                analysis.skills_in_resume.includes("Express") ||
                analysis.skills_in_resume.includes("FastAPI")) && (
                <div className="p-8 rounded-3xl bg-green-900/20 border border-green-500/30 hover:scale-105 transition">
                  Backend Developer
                </div>
              )}

              {/* Database */}
              {(analysis.skills_in_resume.includes("SQL") ||
                analysis.skills_in_resume.includes("MongoDB") ||
                analysis.skills_in_resume.includes("MySQL") ||
                analysis.skills_in_resume.includes("PostgreSQL")) && (
                <div className="p-8 rounded-3xl bg-yellow-900/20 border border-yellow-500/30 hover:scale-105 transition">
                  Database Engineer
                </div>
              )}

              {/* Cloud */}
              {(analysis.skills_in_resume.includes("AWS") ||
                analysis.skills_in_resume.includes("Azure") ||
                analysis.skills_in_resume.includes("GCP")) && (
                <div className="p-8 rounded-3xl bg-cyan-900/20 border border-cyan-500/30 hover:scale-105 transition">
                  Cloud Engineer
                </div>
              )}

              {/* AI / ML */}
              {(analysis.skills_in_resume.includes("Python") ||
                analysis.skills_in_resume.includes("Machine Learning") ||
                analysis.skills_in_resume.includes("Deep Learning")) && (
                <div className="p-8 rounded-3xl bg-purple-900/20 border border-purple-500/30 hover:scale-105 transition">
                  AI / ML Engineer
                </div>
              )}

            </div>
          </section>
        )}

        {/* ================= TIMELINE ================= */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-8">
            Analysis Timeline
          </h3>

          {history.length > 0 ? (
            <div className="space-y-6">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10"
                >
                  <div className="flex justify-between text-sm text-slate-300">
                    <span className="font-semibold">
                      {item.match_score}% Match
                    </span>
                    <span className="text-slate-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-400">
                    Semantic {item.semantic_score}% · Skill Coverage {item.skill_coverage}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">
              No previous analyses yet.
            </p>
          )}
        </section>

      </div>
    </div>
  )
}