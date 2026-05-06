import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { KamBotMood } from '@/types'
import { kamBotMoodVariants } from '@/hooks/useAnimation'

interface KamBotProps {
  mood?: KamBotMood
  size?: number
  className?: string
  /** placeholder: set true to show image slot for future Higgsfield asset */
  useImage?: boolean
}

export default function KamBot({ mood = 'idle', size = 120, className = '' }: KamBotProps) {
  const [blinkOpen, setBlinkOpen] = useState(true)

  // Organic blink: random interval 2–5 s
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3000
      timeout = setTimeout(() => {
        setBlinkOpen(false)
        setTimeout(() => {
          setBlinkOpen(true)
          scheduleBlink()
        }, 120)
      }, delay)
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  const eyeColor = mood === 'celebrate' ? '#FF6B35'
    : mood === 'sad' ? '#9A7FC7'
    : '#00B4D8'

  const bodyColor = mood === 'celebrate' ? '#FFD700' : '#F5A623'

  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      animate={kamBotMoodVariants[mood]}
      style={{ width: size, height: size * 1.4 }}
    >
      {/* ── KamBot SVG ── */}
      {/* Future: replace with <img src="/assets/kambot/kambot-{mood}.webp" /> */}
      <svg
        viewBox="0 0 100 140"
        width={size}
        height={size * 1.4}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* ── Glow aura ── */}
        {mood === 'celebrate' && (
          <ellipse cx="50" cy="120" rx="35" ry="10" fill={bodyColor} opacity="0.3" />
        )}

        {/* ── Camel ears (signature humps) ── */}
        <ellipse cx="20" cy="22" rx="11" ry="16" fill={bodyColor} />
        <ellipse cx="80" cy="22" rx="11" ry="16" fill={bodyColor} />
        {/* ear shine */}
        <ellipse cx="17" cy="17" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />
        <ellipse cx="77" cy="17" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />

        {/* ── Head ── */}
        <rect x="18" y="12" width="64" height="52" rx="22" fill={bodyColor} />
        {/* head shine */}
        <ellipse cx="38" cy="20" rx="12" ry="6" fill="rgba(255,255,255,0.22)" />

        {/* ── Antenna ── */}
        <line x1="50" y1="12" x2="50" y2="2" stroke="#2D1B69" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="1.5" r="3.5" fill={eyeColor} />
        <circle cx="50" cy="1.5" r="1.5" fill="white" />

        {/* ── Eyes ── */}
        {/* left eye */}
        <rect x="26" y="26" width="16" height={blinkOpen ? 12 : 1.5} rx="5" fill={eyeColor}
          style={{ transformOrigin: '34px 32px', transition: 'height 0.08s' }} />
        <circle cx="34" cy="32" r="4" fill="#1A0A2E" opacity={blinkOpen ? 1 : 0} />
        <circle cx="32" cy="30" r="1.5" fill="white" opacity={blinkOpen ? 1 : 0} />
        {/* right eye */}
        <rect x="58" y="26" width="16" height={blinkOpen ? 12 : 1.5} rx="5" fill={eyeColor}
          style={{ transformOrigin: '66px 32px', transition: 'height 0.08s' }} />
        <circle cx="66" cy="32" r="4" fill="#1A0A2E" opacity={blinkOpen ? 1 : 0} />
        <circle cx="64" cy="30" r="1.5" fill="white" opacity={blinkOpen ? 1 : 0} />

        {/* ── Mouth ── */}
        {mood === 'sad' ? (
          <path d="M 35 52 Q 50 47 65 52" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 35 50 Q 50 60 65 50" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* ── Body ── */}
        <rect x="14" y="63" width="72" height="52" rx="18" fill="#2D1B69" stroke={bodyColor} strokeWidth="2" />
        {/* body shine */}
        <ellipse cx="35" cy="70" rx="10" ry="4" fill="rgba(255,255,255,0.12)" />

        {/* ── Chest panel ── */}
        <rect x="28" y="70" width="44" height="28" rx="9" fill="#1A0A2E" />
        {/* panel lights */}
        <circle cx="38" cy="80" r="4" fill="#FF4D9E" opacity="0.9" />
        <circle cx="50" cy="80" r="4" fill="#00E5A0" opacity="0.9" />
        <circle cx="62" cy="80" r="4" fill={bodyColor} opacity="0.9" />
        {/* panel screen */}
        <rect x="34" y="88" width="32" height="6" rx="3" fill="#00B4D8" opacity="0.6" />

        {/* ── Arms ── */}
        <rect x="3" y="66" width="13" height="36" rx="6" fill={bodyColor} />
        <rect x="84" y="66" width="13" height="36" rx="6" fill={bodyColor} />
        {/* hand accents */}
        <circle cx="9" cy="103" r="6" fill="#FF6B35" />
        <circle cx="91" cy="103" r="6" fill="#FF6B35" />

        {/* ── Legs ── */}
        <rect x="22" y="114" width="18" height="22" rx="7" fill={bodyColor} />
        <rect x="60" y="114" width="18" height="22" rx="7" fill={bodyColor} />
        {/* feet */}
        <ellipse cx="31" cy="136" rx="14" ry="6" fill="#FF6B35" />
        <ellipse cx="69" cy="136" rx="14" ry="6" fill="#FF6B35" />

        {/* ── Celebrate sparkles ── */}
        {mood === 'celebrate' && (
          <>
            <text x="85" y="25" fontSize="14" style={{ animation: 'coinFly 1s ease-out infinite' }}>✨</text>
            <text x="2"  y="30" fontSize="12" style={{ animation: 'coinFly 1.2s ease-out infinite' }}>⭐</text>
            <text x="78" y="65" fontSize="10">🎉</text>
          </>
        )}
        {mood === 'thinking' && (
          <>
            <text x="72" y="18" fontSize="14">💭</text>
            <text x="82" y="8"  fontSize="9" opacity="0.7">?</text>
          </>
        )}
        {mood === 'salute' && (
          <text x="82" y="38" fontSize="14">🫡</text>
        )}
      </svg>
    </motion.div>
  )
}
