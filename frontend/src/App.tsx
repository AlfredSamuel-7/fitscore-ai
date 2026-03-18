// src/App.tsx
console.log("[startup] App.tsx loaded (routes below)")

import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Creator from "./pages/Creator"
import Header from "./components/Header"
import ScrollToHash from "./components/ScrollToHash"

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-neutral-900 text-slate-100">
      <Header />

      {/* Handles /#features and /#how scrolling */}
      <ScrollToHash />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + location.hash}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}