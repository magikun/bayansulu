import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import KamBot from '@/components/kambot/KamBot'
import Particles from '@/components/effects/Particles'
import { splashVariants, staggerContainer, staggerItem } from '@/hooks/useAnimation'
import { usePlayerStore } from '@/store/playerStore'

export default function SplashScreen() {
  const navigate = useNavigate()
  const onboardingComplete = usePlayerStore(s => s.onboardingComplete)

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(onboardingComplete ? '/map' : '/onboarding')
    }, 3200)
    return () => clearTimeout(t)
  }, [navigate, onboardingComplete])

  return (
    <motion.div
      className="min-h-dvh bg-deep-navy flex flex-col items-center justify-center relative overflow-hidden"
      variants={splashVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => navigate(onboardingComplete ? '/map' : '/onboarding')}
    >
      {/* Background gradient rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 70%)' }} />
      </div>

      <Particles count={22} />

      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* KamBot mascot */}
        <motion.div variants={staggerItem} className="animate-float">
          <KamBot mood="happy" size={140} />
        </motion.div>

        {/* Logo */}
        <motion.div variants={staggerItem} className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span
              className="font-black leading-none"
              style={{ fontSize: 52, background: 'linear-gradient(135deg, #F5A623, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              BAYAN
            </span>
            <span
              className="font-black leading-none"
              style={{ fontSize: 52, background: 'linear-gradient(135deg, #00B4D8, #48CAE4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              SULU
            </span>
          </div>
          <motion.div
            className="text-white/70 font-black tracking-[0.3em] text-sm mt-1 uppercase"
            variants={staggerItem}
          >
            Kids 🇰🇿
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={staggerItem}
          className="text-white/50 text-center font-bold text-sm px-8 leading-relaxed"
        >
          Explore Kazakhstan through{'\n'}
          <span className="text-kazakh-gold">games, adventures & fun!</span>
        </motion.p>

        {/* Loading dots */}
        <motion.div
          variants={staggerItem}
          className="flex gap-2 mt-2"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-kazakh-gold"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Tap hint */}
      <motion.p
        className="absolute bottom-8 text-white/25 text-xs font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Tap anywhere to start
      </motion.p>
    </motion.div>
  )
}
