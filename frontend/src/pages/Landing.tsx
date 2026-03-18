// src/pages/Landing.tsx
import React, { lazy } from "react"

const Features = lazy(() => import("../sections/Features"))
const HowItWorks = lazy(() => import("../sections/HowItWorks"))

import Hero from "../sections/HeroUltra"
import CTA from "../sections/CTA"
import Footer from "../sections/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      {/* Hero Section */}
      <Hero />

      <main className="relative z-20">
        <Features />
        <HowItWorks />

        <section className="py-20">
          <div className="container-max">
            <CTA />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}