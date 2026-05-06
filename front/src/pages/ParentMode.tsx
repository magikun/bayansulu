import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import HUDBar from '@/components/layout/HUDBar'
import BottomNav from '@/components/layout/BottomNav'
import KamBot from '@/components/kambot/KamBot'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import { usePlayerStore } from '@/store/playerStore'
import { useGameStore } from '@/store/gameStore'
import { pageVariants } from '@/hooks/useAnimation'

const CORRECT_PIN = '1234'

const GAME_LABELS: Record<string, string> = {
  memory: '🧠 Memory Rush',
  runner: '🐪 Camel Runner',
  yurt:   '🏕️ Yurt Builder',
  quiz:   '🗺️ Quiz Adventure',
  math:   '🔢 Math Battle',
}

export default function ParentMode() {
  const navigate = useNavigate()
  const { name, level, xp, xpToNext, botacoins, streak, badges, completedGames, reset } = usePlayerStore()
  const { highScores } = useGameStore()

  const [pin, setPin]       = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [screenTime, setScreenTime] = useState(60)

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return
    const newPin = pin + d
    setPin(newPin)
    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        setUnlocked(true)
        setPinError(false)
      } else {
        setPinError(true)
        setTimeout(() => { setPin(''); setPinError(false) }, 800)
      }
    }
  }

  const earnedBadges = badges.filter(b => b.earned).length

  return (
    <motion.div
      className="min-h-dvh flex flex-col bg-deep-navy"
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
    >
      <HUDBar />

      <div className="flex-1 overflow-y-auto px-3 py-3">

        {!unlocked ? (
          /* PIN Screen */
          <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
            <KamBot mood="salute" size={100} />
            <div className="text-center">
              <h2 className="text-white font-black text-2xl mb-1">👤 Parent Mode</h2>
              <p className="text-white/40 font-bold text-sm">Enter PIN to access</p>
            </div>

            {/* PIN display */}
            <motion.div
              className="flex gap-3"
              animate={pinError ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.35 }}
            >
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black"
                  style={{
                    background: pin.length > i ? '#F5A623' : 'rgba(255,255,255,0.1)',
                    border: pinError ? '2px solid #FF4D9E' : pin.length > i ? '2px solid #FFD700' : '2px solid rgba(255,255,255,0.2)',
                    boxShadow: pin.length > i ? '0 0 12px rgba(245,166,35,0.5)' : 'none',
                  }}
                >
                  {pin.length > i ? '●' : ''}
                </div>
              ))}
            </motion.div>

            {pinError && (
              <motion.p className="text-candy-pink font-bold text-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Wrong PIN! Try again
              </motion.p>
            )}

            {/* Number pad */}
            <div className="grid grid-cols-3 gap-3 w-64">
              {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((d, i) => (
                <motion.button
                  key={i}
                  className="h-14 rounded-3xl font-black text-xl text-white flex items-center justify-center"
                  style={{ background: d ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                  whileHover={d ? { scale: 1.08 } : {}}
                  whileTap={d ? { scale: 0.9 } : {}}
                  onClick={() => {
                    if (d === '⌫') setPin(p => p.slice(0, -1))
                    else if (d) handleDigit(d)
                  }}
                >
                  {d}
                </motion.button>
              ))}
            </div>
            <p className="text-white/20 text-xs font-bold">Hint: 1234</p>
          </div>
        ) : (
          /* Dashboard */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-black text-xl">📊 Parent Dashboard</h2>
              <motion.div whileHover={{ scale: 1.05 }}>
                <KamBot mood="salute" size={56} />
              </motion.div>
            </div>

            {/* Child summary */}
            <div className="glass rounded-4xl p-4">
              <h3 className="text-white/50 text-xs font-bold mb-3 uppercase tracking-wide">Child Profile</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-kazakh-gold/20 flex items-center justify-center text-2xl">
                  🦅
                </div>
                <div>
                  <p className="text-white font-black">{name || 'Explorer'}</p>
                  <p className="text-white/50 text-sm">Level {level} · {earnedBadges} badges earned</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-kazakh-gold font-black">{botacoins} 🪙</p>
                  <p className="text-warm-orange text-sm font-bold">{streak}🔥 streak</p>
                </div>
              </div>
              <ProgressBar value={xp} max={xpToNext} label="XP Progress" showLabel color="#00B4D8" height={10} />
            </div>

            {/* Game progress */}
            <div className="glass rounded-4xl p-4">
              <h3 className="text-white/50 text-xs font-bold mb-3 uppercase tracking-wide">Game Progress</h3>
              <div className="space-y-2">
                {Object.entries(GAME_LABELS).map(([id, label]) => {
                  const done = completedGames.includes(id)
                  const hs   = highScores[id] ?? 0
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white/70 flex-1">{label}</span>
                      <span className="text-xs font-bold" style={{ color: done ? '#00E5A0' : 'rgba(255,255,255,0.3)' }}>
                        {done ? '✅ Done' : '⬜ Not yet'}
                      </span>
                      {hs > 0 && <span className="text-kazakh-gold text-xs font-bold">🏆 {hs}</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Screen time */}
            <div className="glass rounded-4xl p-4">
              <h3 className="text-white/50 text-xs font-bold mb-2 uppercase tracking-wide">Screen Time Limit</h3>
              <div className="flex items-center gap-3">
                <span className="text-white font-black text-2xl">{screenTime} min</span>
                <input
                  type="range" min={15} max={180} step={15}
                  value={screenTime}
                  onChange={e => setScreenTime(Number(e.target.value))}
                  className="flex-1 accent-kazakh-gold"
                />
              </div>
              <p className="text-white/30 text-xs mt-1">Daily screen time limit (UI only)</p>
            </div>

            {/* Educational stats */}
            <div className="glass rounded-4xl p-4">
              <h3 className="text-white/50 text-xs font-bold mb-3 uppercase tracking-wide">Learning Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Math Problems', val: '48+', icon: '🔢', color: '#00B4D8' },
                  { label: 'Quiz Answers',  val: '30+', icon: '🗺️', color: '#F5A623' },
                  { label: 'Memory Pairs',  val: '24+', icon: '🧠', color: '#00E5A0' },
                  { label: 'Yurts Built',   val: completedGames.includes('yurt') ? '1' : '0', icon: '🏕️', color: '#FF6B35' },
                ].map(s => (
                  <div key={s.label} className="rounded-3xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-2xl">{s.icon}</span>
                    <p className="font-black text-xl mt-1" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-white/40 text-[10px] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset button */}
            <Button variant="ghost" fullWidth onClick={() => {
              if (confirm('Reset all progress? This cannot be undone.')) {
                reset(); setUnlocked(false); navigate('/splash')
              }
            }}>
              🔄 Reset Child Progress
            </Button>

            <div className="h-4" />
          </div>
        )}
      </div>

      <BottomNav />
    </motion.div>
  )
}
