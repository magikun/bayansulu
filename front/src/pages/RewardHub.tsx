import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HUDBar from '@/components/layout/HUDBar'
import BottomNav from '@/components/layout/BottomNav'
import KamBot from '@/components/kambot/KamBot'
import BadgeCard from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Confetti from '@/components/effects/Confetti'
import Modal from '@/components/ui/Modal'
import { usePlayerStore } from '@/store/playerStore'
import { useGameStore } from '@/store/gameStore'
import { getRandomDailyReward } from '@/data/mockData'
import { pageVariants } from '@/hooks/useAnimation'

export default function RewardHub() {
  const { botacoins, xp, xpToNext, level, streak, badges, addCoins, addXP } = usePlayerStore()
  const { dailyRewardClaimed, claimDailyReward } = useGameStore()

  const [chestOpen, setChestOpen] = useState(false)
  const [reward, setReward]       = useState<{ label: string; icon: string } | null>(null)
  const [confetti, setConfetti]   = useState(false)

  const openChest = () => {
    if (dailyRewardClaimed) return
    const r = getRandomDailyReward()
    claimDailyReward()
    if (r.type === 'coins' && r.amount) addCoins(r.amount)
    if (r.type === 'xp' && r.amount) addXP(r.amount)
    setReward({ label: r.label, icon: r.icon })
    setChestOpen(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 2000)
  }

  // Last 7 days streak display
  const streakDays = Array.from({ length: 7 }, (_, i) => i < streak)

  return (
    <motion.div
      className="min-h-dvh flex flex-col bg-deep-navy"
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
    >
      <HUDBar />
      <Confetti active={confetti} />

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-white font-black text-2xl">
            🏆 <span className="text-gradient-gold">Reward Hub</span>
          </h1>
          <p className="text-white/40 text-xs font-bold">Your progress &amp; achievements</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Botacoins', val: botacoins, icon: '🪙', color: '#F5A623' },
            { label: 'Level',     val: level,     icon: '⭐', color: '#00B4D8' },
            { label: 'Streak',    val: streak,    icon: '🔥', color: '#FF6B35' },
          ].map(s => (
            <div key={s.label} className="glass rounded-4xl p-3 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="font-black text-xl" style={{ color: s.color }}>{s.val}</p>
              <p className="text-white/40 text-[10px] font-bold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* XP Bar */}
        <div className="glass rounded-4xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-sm">⭐ Level {level}</span>
            <span className="text-white/50 text-xs font-bold">{xp} / {xpToNext} XP</span>
          </div>
          <ProgressBar value={xp} max={xpToNext} color="#00B4D8" height={12} glow />
          <p className="text-white/30 text-xs font-bold mt-2 text-center">
            {xpToNext - xp} XP until Level {level + 1}
          </p>
        </div>

        {/* Daily Chest */}
        <div className="glass rounded-4xl p-4 text-center">
          <h3 className="text-white font-black mb-1">🎁 Daily Reward</h3>
          <p className="text-white/40 text-xs font-bold mb-3">
            {dailyRewardClaimed ? 'Come back tomorrow!' : 'Open your chest!'}
          </p>
          <motion.div
            className="text-7xl mx-auto mb-3 cursor-pointer inline-block"
            animate={dailyRewardClaimed ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={!dailyRewardClaimed ? { scale: 1.12 } : {}}
            whileTap={!dailyRewardClaimed ? { scale: 0.9 } : {}}
            onClick={openChest}
          >
            {dailyRewardClaimed ? '🔒' : '🎁'}
          </motion.div>
          {!dailyRewardClaimed && (
            <Button variant="primary" onClick={openChest}>Open Chest! 🎉</Button>
          )}
        </div>

        {/* 7-day streak */}
        <div className="glass rounded-4xl p-4">
          <h3 className="text-white font-black mb-3">🔥 Weekly Streak</h3>
          <div className="flex gap-2 justify-between">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
                  style={{
                    background: streakDays[i]
                      ? 'linear-gradient(135deg, #F5A623, #FF6B35)'
                      : 'rgba(255,255,255,0.08)',
                    boxShadow: streakDays[i] ? '0 0 12px rgba(245,166,35,0.5)' : 'none',
                  }}
                >
                  {streakDays[i] ? '✅' : <span className="text-white/30">{d}</span>}
                </div>
                <span className="text-[9px] font-bold text-white/30">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="glass rounded-4xl p-4">
          <h3 className="text-white font-black mb-3">🏅 Badges</h3>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(b => (
              <BadgeCard key={b.id} badge={b} size="sm" />
            ))}
          </div>
        </div>

        {/* KamBot */}
        <div className="flex flex-col items-center py-2">
          <KamBot mood="happy" size={80} className="animate-float" />
          <p className="text-white/30 text-xs font-bold mt-1">Keep playing to unlock more! 🌟</p>
        </div>
      </div>

      <BottomNav />

      {/* Reward revealed modal */}
      <Modal open={chestOpen} onClose={() => setChestOpen(false)}>
        <div className="text-center">
          <motion.div
            className="text-7xl mb-3 block"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8 }}
          >
            {reward?.icon}
          </motion.div>
          <h2 className="text-kazakh-gold font-black text-2xl mb-2">
            {reward?.label}
          </h2>
          <p className="text-white/60 font-bold mb-4">Added to your account!</p>
          <Button variant="primary" fullWidth onClick={() => setChestOpen(false)}>
            Awesome! 🎉
          </Button>
        </div>
      </Modal>
    </motion.div>
  )
}
