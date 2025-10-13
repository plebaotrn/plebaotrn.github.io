"use client"

import { useEffect, useState } from "react"

interface ClickRipple {
  id: number
  x: number
  y: number
}

export function ClickEffect() {
  const [ripples, setRipples] = useState<ClickRipple[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997]">
      {ripples.map((ripple) => (
        <div key={ripple.id}>
          {/* Main ripple effect */}
          <div
            className="absolute animate-ping"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40" />
          </div>

          {/* Secondary ripple */}
          <div
            className="absolute animate-ping"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              transform: "translate(-50%, -50%)",
              animationDelay: "100ms",
            }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30" />
          </div>

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8
            const distance = 40
            const x = Math.cos((angle * Math.PI) / 180) * distance
            const y = Math.sin((angle * Math.PI) / 180) * distance

            return (
              <div
                key={i}
                className="absolute h-2 w-2 animate-ping rounded-full"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animationDelay: `${i * 50}ms`,
                  animationDuration: "800ms",
                  background: i % 2 === 0 ? "var(--gradient-start)" : "var(--gradient-end)",
                }}
              />
            )
          })}

          {/* Sparkle effect */}
          <div
            className="absolute animate-pulse"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" className="animate-spin">
              <path
                d="M16 0L17.5 14.5L32 16L17.5 17.5L16 32L14.5 17.5L0 16L14.5 14.5L16 0Z"
                fill="url(#sparkleGradient)"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="sparkleGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="var(--gradient-start)" />
                  <stop offset="100%" stopColor="var(--gradient-end)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
