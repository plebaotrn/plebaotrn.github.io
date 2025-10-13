"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null,
      )
    }

    window.addEventListener("mousemove", updateCursor)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
    }
  }, [])

  return (
    <>
      {/* Main carrot cursor */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.3 : 1}) rotate(${isPointer ? 15 : 0}deg)`,
        }}
      >
        <svg
          width="24"
          height="32"
          viewBox="0 0 24 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Carrot body */}
          <path
            d="M12 2C8 2 4 6 4 12C4 18 8 28 12 30C16 28 20 18 20 12C20 6 16 2 12 2Z"
            fill="url(#carrotGradient)"
            stroke="#FF6B35"
            strokeWidth="1"
          />
          {/* Carrot leaves */}
          <path d="M10 2C10 2 8 0 6 2C6 2 8 4 10 2Z" fill="#4CAF50" />
          <path d="M14 2C14 2 16 0 18 2C18 2 16 4 14 2Z" fill="#4CAF50" />
          <path d="M12 1C12 1 11 -1 10 0C10 0 11 2 12 1Z" fill="#66BB6A" />
          {/* Carrot details */}
          <line x1="8" y1="10" x2="9" y2="11" stroke="#FF8A65" strokeWidth="0.5" />
          <line x1="10" y1="14" x2="11" y2="15" stroke="#FF8A65" strokeWidth="0.5" />
          <line x1="13" y1="12" x2="14" y2="13" stroke="#FF8A65" strokeWidth="0.5" />
          <line x1="15" y1="16" x2="16" y2="17" stroke="#FF8A65" strokeWidth="0.5" />
          <defs>
            <linearGradient id="carrotGradient" x1="12" y1="2" x2="12" y2="30">
              <stop offset="0%" stopColor="#FF7043" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Cursor trail effect */}
      <div
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border-2 border-primary/30 transition-all duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
    </>
  )
}
