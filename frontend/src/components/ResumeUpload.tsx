// src/components/ResumeUpload.tsx
import React, { useState } from "react"
import api from "../lib/api"
import { AnalyzeResult } from "../types"

interface Props {
  onUploaded?: (data: AnalyzeResult) => void
}

export default function ResumeUpload({ onUploaded }: Props) {
  const [resumeText, setResumeText] = useState("")
  const [jdText, setJdText] = useState("")
  const [result, setResult] = useState<AnalyzeResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyze() {
    if (!resumeText || !jdText) {
      setError("Please paste both resume text and job description.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await api.post("/analyze", {
        resume_text: resumeText,
        job_description: jdText,
      })

      setResult(res.data)
      onUploaded?.(res.data)
    } catch (err) {
      console.error(err)
      setError("Failed to analyze resume. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 p-8 shadow-2xl">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Resume vs Job Description
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Evaluate semantic alignment and skill coverage using transformer-based AI.
        </p>
      </div>

      {/* INPUT GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Resume */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-white">
              Resume
            </span>
            <span className="text-xs text-slate-400">
              {resumeText.length} chars
            </span>
          </div>

          <textarea
            rows={10}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Paste your resume text..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        {/* Job Description */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-white">
              Job Description
            </span>
            <span className="text-xs text-slate-400">
              {jdText.length} chars
            </span>
          </div>

          <textarea
            rows={10}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            placeholder="Paste the job description..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}

      {/* ANALYZE BUTTON */}
      <div className="mt-8 text-center">
        <button
          onClick={analyze}
          disabled={loading}
          className="
            px-10 py-4 rounded-xl
            bg-gradient-to-r from-indigo-500 to-cyan-400
            text-white font-semibold
            shadow-lg
            hover:opacity-90
            disabled:opacity-50
            transition
          "
        >
          {loading ? "Analyzing with AI..." : "Analyze Match"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-10 border-t border-white/10 pt-8">

          {/* Score */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">
                Match Score
              </div>
              <div className="text-5xl font-extrabold text-white">
                {result.match_score}%
              </div>
            </div>

            <div className="w-1/2">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all"
                  style={{ width: `${result.match_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Matched */}
            <div>
              <h4 className="text-white font-semibold mb-3">
                Matched Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.skills_in_resume.map((skill) => (
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
            <div>
              <h4 className="text-white font-semibold mb-3">
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">
                Recommendations
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-400">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  )
}