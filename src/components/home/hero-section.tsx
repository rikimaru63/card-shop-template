"use client"

import Link from "next/link"
import { ArrowRight, Shield, Truck, Package } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config/site"
import { businessConfig } from "@/lib/config/business"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden grain-overlay">
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white to-stone-50" />

      {/* Thin accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[520px] md:min-h-[560px] py-16 lg:py-20">
          {/* Left: Text content */}
          <div className="max-w-xl">
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-px w-8 bg-stone-400" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">
                Direct from Japan
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display), serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium Trading
              <br />
              Cards,{" "}
              <span className="italic font-normal text-stone-400">
                Curated
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-stone-500 mb-8 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Authenticated singles, sealed products, and PSA graded cards — shipped worldwide with care.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="group font-medium px-6 rounded-full"
                >
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/products?isNewArrival=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium px-6 rounded-full border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  New Arrivals
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                <span>Free shipping {businessConfig.currency.symbol}{businessConfig.shipping.freeThreshold.toLocaleString()}+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5" />
                <span>Secure packaging</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual card display */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-[320px] md:w-[380px]">
              {/* Back card — rotated */}
              <motion.div
                className="absolute top-4 -left-6 w-[220px] md:w-[260px] aspect-[3/4] rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-200/60 shadow-lg"
                initial={{ rotate: -8, opacity: 0 }}
                animate={{ rotate: -8, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute inset-3 rounded-lg border border-stone-300/40 flex items-center justify-center">
                  <span className="text-stone-300 text-xs font-medium tracking-wider uppercase">Card</span>
                </div>
              </motion.div>

              {/* Middle card */}
              <motion.div
                className="absolute top-2 left-4 md:left-6 w-[220px] md:w-[260px] aspect-[3/4] rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 shadow-xl"
                initial={{ rotate: -3, opacity: 0 }}
                animate={{ rotate: -3, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="absolute inset-3 rounded-lg border border-amber-200/40 flex items-center justify-center">
                  <span className="text-amber-300 text-xs font-medium tracking-wider uppercase">Card</span>
                </div>
              </motion.div>

              {/* Front card — main */}
              <motion.div
                className="relative w-[220px] md:w-[260px] aspect-[3/4] rounded-xl bg-white border border-stone-200 shadow-2xl ml-12 md:ml-16"
                initial={{ rotate: 4, opacity: 0, y: 20 }}
                animate={{ rotate: 4, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="absolute inset-3 rounded-lg bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <span className="text-amber-600 text-lg font-bold" style={{ fontFamily: 'var(--font-display), serif' }}>★</span>
                  </div>
                  <span className="text-stone-400 text-xs font-medium tracking-wider uppercase">Your card here</span>
                </div>

                {/* Grade badge */}
                <div className="absolute -top-3 -right-3 bg-white rounded-full px-3 py-1 shadow-lg border border-stone-100">
                  <span className="text-xs font-bold text-stone-700">PSA 10</span>
                </div>
              </motion.div>

              {/* Decorative dot */}
              <div className="absolute -bottom-4 right-8 w-20 h-20 rounded-full bg-amber-100/60 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
    </section>
  )
}
