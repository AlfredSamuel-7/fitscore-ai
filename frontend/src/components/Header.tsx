// src/components/Header.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id: string) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container-max">
        <div className="h-16 flex items-center justify-between">

          {/* ===== Brand ===== */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white font-bold shadow">
              FS
            </div>

            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold text-white">
                FitScore AI
              </div>
              <div className="text-xs text-slate-400">
                AI Resume–Job Intelligence
              </div>
            </div>
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <nav className="hidden md:flex items-center gap-8 text-sm">

            <button
              onClick={() => handleScroll("features")}
              className="text-slate-300 hover:text-white transition"
            >
              Features
            </button>

            <button
              onClick={() => handleScroll("how")}
              className="text-slate-300 hover:text-white transition"
            >
              How it works
            </button>

            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white transition"
            >
              Resume vs JD
            </Link>

            <Link
              to="/creator"
              className="text-slate-300 hover:text-white transition"
            >
              Creator
            </Link>
          </nav>

          {/* ===== Right Section ===== */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-slate-300">
                  {user.name}
                </span>

                <button
                  onClick={signout}
                  className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 transition text-white text-sm"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="hidden sm:inline-flex px-3 py-2 rounded-md border border-slate-700 bg-slate-900/60 text-slate-200 text-sm hover:bg-slate-800 transition"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-primary-600 to-accent-400 text-white text-sm shadow hover:opacity-90 transition"
                >
                  Try it now
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen((s) => !s)}
              className="md:hidden p-2 rounded-md bg-slate-800/70"
              aria-label="Toggle menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md">
          <div className="container-max py-4 flex flex-col gap-3 text-sm">

            <button
              onClick={() => handleScroll("features")}
              className="text-slate-300 hover:text-white transition text-left"
            >
              Features
            </button>

            <button
              onClick={() => handleScroll("how")}
              className="text-slate-300 hover:text-white transition text-left"
            >
              How it works
            </button>

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition"
            >
              Resume vs JD
            </Link>

            <Link
              to="/creator"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition"
            >
              Creator
            </Link>

            <div className="pt-2 flex gap-3">
              {user ? (
                <button
                  onClick={signout}
                  className="px-3 py-2 rounded-md bg-red-600 text-white text-sm"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-3 py-2 rounded-md border border-slate-700 text-slate-200"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-md bg-primary-500 text-white"
                  >
                    Try it now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}