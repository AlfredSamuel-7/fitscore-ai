// src/sections/Footer.tsx
import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/10 bg-gradient-to-b from-black to-[#0a0a0f]">

      <div className="container-max py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* ===== Brand ===== */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white">
                FS
              </div>

              <div>
                <div className="text-white font-semibold">
                  FitScore AI
                </div>
                <div className="text-xs text-slate-500">
                  AI Resume–Job Intelligence
                </div>
              </div>
            </div>

            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              Transformer-powered resume alignment platform helping candidates
              understand contextual job fit and improve strategically.
            </p>
          </div>

          {/* ===== Product ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Product
            </h4>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-white transition">
                  How it works
                </a>
              </li>
              <li>
                <Link to="/resume-vs-jd" className="hover:text-white transition">
                  Resume vs JD
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Creator ===== */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Creator
            </h4>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/creator" className="hover:text-white transition">
                  About the Creator
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} FitScore AI · Built with FastAPI, React & Transformer Embeddings
        </div>

      </div>
    </footer>
  )
}