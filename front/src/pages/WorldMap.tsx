import { motion } from 'framer-motion'
import HUDBar from '@/components/layout/HUDBar'
import BottomNav from '@/components/layout/BottomNav'
import KazakhstanMap from '@/components/map/KazakhstanMap'
import CloudLayer from '@/components/map/CloudLayer'
import KamBot from '@/components/kambot/KamBot'
import KamBotBubble from '@/components/kambot/KamBotBubble'
import Particles from '@/components/effects/Particles'
import { usePlayerStore } from '@/store/playerStore'
import { pageVariants } from '@/hooks/useAnimation'
import { kamBotTips } from '@/data/mockData'
import { useEffect, useState } from 'react'

export default function WorldMap() {
  const name = usePlayerStore(s => s.name)
  const [tipIdx, setTipIdx] = useState(0)

  // Rotate tips every 6 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setTipIdx(i => (i + 1) % kamBotTips.map.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      className="min-h-dvh flex flex-col bg-deep-navy relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HUDBar />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-1/2"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,166,35,0.06) 0%, transparent 70%)' }} />
        <Particles count={14} />
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center pt-3 pb-1 px-4"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-white font-black text-lg">
          🗺️ <span className="text-gradient-gold">Kazakhstan Adventure</span>
        </h1>
        <p className="text-white/40 text-xs font-bold mt-0.5">Tap a city to play!</p>
      </motion.div>

      {/* Map */}
      <motion.div
        className="relative z-10 flex-1 px-2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <CloudLayer />
        <KazakhstanMap />
      </motion.div>

      {/* KamBot + bubble */}
      <motion.div
        className="fixed bottom-20 right-3 z-30"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
      >
        <div className="relative">
          <KamBotBubble
            message={kamBotTips.map[tipIdx]}
            visible={true}
            side="right"
          />
          <KamBot mood="idle" size={80} />
        </div>
      </motion.div>

      {/* Welcome banner (shown once) */}
      <motion.div
        className="relative z-10 mx-3 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-3xl px-4 py-2.5 flex items-center gap-3">
          <span className="text-2xl">🌟</span>
          <div>
            <p className="text-white font-black text-sm">
              Welcome back, <span className="text-kazakh-gold">{name || 'Explorer'}</span>!
            </p>
            <p className="text-white/45 text-xs">5 cities to explore across Kazakhstan</p>
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </motion.div>
  )
}
