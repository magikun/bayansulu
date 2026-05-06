import { usePlayerStore } from '@/store/playerStore'
import { avatars } from '@/data/mockData'
import ProgressBar from '@/components/ui/ProgressBar'
import { motion } from 'framer-motion'

export default function HUDBar() {
  const { name, avatarId, level, xp, xpToNext, botacoins, streak } = usePlayerStore()
  const avatar = avatars[avatarId] ?? avatars[0]

  return (
    <div className="glass-dark sticky top-0 z-40 px-3 py-2 flex items-center gap-2">
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 ${avatar.bg}`}>
        {avatar.emoji}
      </div>

      {/* Name + XP */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-white font-black text-sm truncate max-w-[90px]">
            {name || 'Explorer'}
          </span>
          <span className="text-white/50 text-[10px] font-bold">Lv.{level}</span>
        </div>
        <ProgressBar value={xp} max={xpToNext} height={6} color="#00B4D8" glow />
      </div>

      {/* Streak */}
      {streak > 0 && (
        <motion.div
          className="flex items-center gap-0.5 shrink-0"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-base">🔥</span>
          <span className="text-warm-orange font-black text-xs">{streak}</span>
        </motion.div>
      )}

      {/* Coins */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-base">🪙</span>
        <motion.span
          key={botacoins}
          className="text-kazakh-gold font-black text-sm"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {botacoins}
        </motion.span>
      </div>
    </div>
  )
}
