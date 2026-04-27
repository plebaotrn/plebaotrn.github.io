"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, ChevronDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const playlist = [
  { title: "Wave Star", src: "/wave-star.mp3" },
  { title: "Mabataki 「瞬き」 — KIRA", src: "/Mabataki.mp3" },
]

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => setCurrentTrack((t) => (t + 1) % playlist.length)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("ended", onEnd)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("ended", onEnd)
    }
  }, [currentTrack])

  const togglePlay = async () => {
    if (!audioRef.current) return
    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch {
      setIsPlaying(false)
    }
  }

  const formatTime = (t: number) => {
    if (isNaN(t)) return "0:00"
    return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`
  }

  return (
    <>
      <audio ref={audioRef} src={playlist[currentTrack].src} preload="metadata" />

      {/* Floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Music player"
        className={`fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full flex items-center justify-center shadow-lg border border-border transition-all duration-200
          ${isPlaying
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:text-foreground"
          }`}
      >
        <Music className="h-4 w-4" />
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
        )}
      </button>

      {/* Player panel */}
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-300 origin-bottom-right ${
          isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-72 rounded-xl border border-border bg-background shadow-xl p-4 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{playlist[currentTrack].title}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {currentTrack + 1} / {playlist.length}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={([v]) => {
                setCurrentTime(v)
                if (audioRef.current) audioRef.current.currentTime = v
              }}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentTrack((t) => (t === 0 ? playlist.length - 1 : t - 1))}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={togglePlay}
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTrack((t) => (t + 1) % playlist.length)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.muted = !isMuted
                setIsMuted(!isMuted)
              }}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              {isMuted || volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={([v]) => {
                setVolume(v)
                setIsMuted(v === 0)
                if (audioRef.current) {
                  audioRef.current.volume = v
                  audioRef.current.muted = v === 0
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
