// src/pages/JDMatching.tsx
import React, { useState } from "react"

type Result = {
  match_score: number
  skills_in_resume: string[]
  missing_skills: string[]
  recommendations: string[]
}

export default function JDMatching() {
  const [resumeText, setResumeText] = useState("")
  const [jdText, setJdText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    if (!resumeText.trim() || !jdText.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: jdText,
        }),
      })

      if (!res.ok) throw new Error("Analysis failed")

      const data = await res.json()
      setResult(data)
    } catch {
      setError("Failed to analyze resume and job description.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto text-slate-200">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Resume vs Job Description
        </h1>
        <p className="mt-3 text-slate-400 max-w-2xl">
          Paste your resume and a target job description to evaluate semantic alignment
          and skill coverage using transformer-based analysis.
        </p>
      </div>

      {/* INPUT SECTION */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Resume Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-white">
              Resume Text
            </h2>
            <span className="text-xs text-slate-400">
              {resumeText.length} characters
            </span>
          </div>

          <textarea
            rows={12}
            className="w-full bg-neutral-900/80 border border-neutral-700 p-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Paste your resume content..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        {/* JD Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-white">
              Job Description
            </h2>
            <span className="text-xs text-slate-400">
              {jdText.length} characters
            </span>
          </div>

          <textarea
            rows={12}
            className="w-full bg-neutral-900/80 border border-neutral-700 p-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            placeholder="Paste the job description..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
        </div>
      </div>

      {/* ANALYZE BUTTON */}
      <div className="mt-10 text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="
            px-10 py-4 rounded-xl
            bg-gradient-to-r from-indigo-500 to-cyan-400
            font-semibold text-white
            shadow-lg
            hover:opacity-90
            disabled:opacity-50
            transition
          "
        >
          {loading ? "Analyzing with AI..." : "Analyze Resume vs JD"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-16 bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* SCORE */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">
                Match Score
              </div>
              <div className="text-6xl font-extrabold text-white mt-2">
                {result.match_score}%
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                Calculated using semantic similarity and skill coverage weighting.
              </p>
            </div>

            <div className="w-full md:w-1/3">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all"
                  style={{ width: `${result.match_score}%` }}
                />
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="my-10 border-t border-white/10" />

          {/* Skills */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Matched */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.skills_in_resume.length > 0 ? (
                  result.skills_in_resume.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    No matched skills detected.
                  </span>
                )}
              </div>
            </div>

            {/* Missing */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.length > 0 ? (
                  result.missing_skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    Your resume covers most required skills.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <>
              <div className="my-10 border-t border-white/10" />
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Recommendations
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-indigo-400">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  )
}