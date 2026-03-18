// src/pages/NotFound.tsx
import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function NotFound() {
  const loc = useLocation()
  return (
    <div className="container-max mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-400">No route matched location: <strong>{loc.pathname}</strong></p>
      <div className="mt-6">
        <Link to="/" className="inline-block px-4 py-2 rounded bg-indigo-600 text-white">Go home</Link>
      </div>
    </div>
  )
}
