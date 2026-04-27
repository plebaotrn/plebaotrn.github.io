"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface Props {
  children: ReactNode
  delay?: number
  direction?: "up" | "left" | "right" | "none"
  className?: string
  threshold?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("sr-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("sr-visible"), delay)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={`sr-${direction} ${className}`}>
      {children}
    </div>
  )
}
