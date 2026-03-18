// src/sections/CTA.tsx
import React from 'react'

export default function CTA() {
  return (
    <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to get job-ready?</h3>
          <p className="mt-2 text-sm opacity-90">Sign up and get a personalized action plan in minutes.</p>
        </div>
        <div>
          <a href="/signup" className="px-5 py-3 rounded-md bg-white text-primary-700 font-semibold">Create account</a>
        </div>
      </div>
    </div>
  )
}
