// src/sections/Hero.tsx
import React from "react"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="py-20">
      <div className="container-max max-w-4xl mx-auto text-center">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          AI-powered Resume–Job Matching made simple
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Paste your resume and a job description to instantly see how well you match,
          identify missing skills, and understand what you need to learn for the role.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/jd-matching"
            className="inline-flex justify-center items-center px-6 py-3 bg-primary-500 text-white rounded-md shadow hover:bg-primary-600 transition"
          >
            Analyze Resume vs Job Description
          </Link>

          <a
            href="#how"
            className="inline-flex justify-center items-center px-6 py-3 border rounded-md text-slate-700 hover:bg-slate-100 transition"
          >
            How it works
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-600">
          <li>
            <strong>✔</strong> Resume vs JD semantic comparison
          </li>
          <li>
            <strong>✔</strong> Skill gap identification
          </li>
          <li>
            <strong>✔</strong> Clear learning recommendations
          </li>
        </ul>
      </div>
    </section>
  )
}
