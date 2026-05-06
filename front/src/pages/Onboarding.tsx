import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlayerStore } from '@/store/playerStore'
import { avatars } from '@/data/mockData'
import Button from '@/components/ui/Button'
import KamBot from '@/components/kambot/KamBot'
import Confetti from '@/components/effects/Confetti'
import { slideInFromRight } from '@/hooks/useAnimation'

const AGES = [7, 8, 9, 10, 11]

export default function Onboarding() {
  const navigate = useNavigate()
  const { setName, setAge, setAvatar, completeOnboarding, unlockBadge, addCoins, addXP } = usePlayerStore()

  const [step, setStep] = useState(1)
  const [localName, setLocalName] = useState('')
  const [localAge, setLocalAge] = useState(8)
  const [localAvatar, setLocalAvatar] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const goNext = () => setStep(s => s + 1)

  const finish = () => {
    setName(localName || 'Explorer')
    setAge(localAge)
    setAvatar(localAvatar)
    completeOnboarding()
    unlockBadge('first-steps')
    addCoins(50)
    addXP(30)
    setShowConfetti(true)
    setTimeout(() => navigate('/map'), 2200)
  }

  return (
    <div className="min-h-dvh bg-deep-navy flex flex-col relative overflow-hidden">
      <Confetti active={showConfetti} />

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {[1, 2, 3, 4].map(s => (
          <motion.div
            key={s}
            className="rounded-full"
            animate={{
              width: step === s ? 24 : 8,
              background: step >= s ? '#F5A623' : 'rgba(255,255,255,0.2)',
            }}
            style={{ height: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            className="flex-1 flex flex-col items-center justify-center px-6 gap-6"
            variants={slideInFromRight} initial="initial" animate="animate" exit="exit"
          >
            <KamBot mood="happy" size={110} className="animate-float" />
            <div className="text-center">
              <h2 className="text-white font-black text-2xl mb-1">Hey there! 👋</h2>
              <p className="text-white/60 font-bold text-sm">What's your name, explorer?</p>
            </div>
            <input
              className="w-full text-center text-xl font-black text-white rounded-3xl px-5 py-4 outline-none
                border-2 focus:border-kazakh-gold transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', borderColor: localName ? '#F5A623' : 'rgba(255,255,255,0.18)' }}
              placeholder="Type your name..."
              value={localName}
              onChange={e => setLocalName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <Button
              variant="primary" size="lg" fullWidth
              disabled={localName.trim().length < 2}
              onClick={goNext}
            >
              Let's go! →
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="flex-1 flex flex-col items-center justify-center px-6 gap-6"
            variants={slideInFromRight} initial="initial" animate="animate" exit="exit"
          >
            <KamBot mood="thinking" size={110} className="animate-float" />
            <div className="text-center">
              <h2 className="text-white font-black text-2xl mb-1">How old are you, {localName}?</h2>
              <p className="text-white/60 font-bold text-sm">Pick your age below</p>
            </div>
            <div className="flex gap-3">
              {AGES.map(age => (
                <motion.button
                  key={age}
                  className="w-14 h-14 rounded-full font-black text-lg flex items-center justify-center"
                  style={{
                    background: localAge === age ? '#F5A623' : 'rgba(255,255,255,0.1)',
                    color: localAge === age ? '#1A0A2E' : 'white',
                    border: localAge === age ? '2px solid #FFD700' : '2px solid transparent',
                    boxShadow: localAge === age ? '0 0 16px rgba(245,166,35,0.6)' : 'none',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLocalAge(age)}
                >
                  {age}
                </motion.button>
              ))}
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={goNext}>
              That's me! →
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className="flex-1 flex flex-col items-center justify-center px-6 gap-6"
            variants={slideInFromRight} initial="initial" animate="animate" exit="exit"
          >
            <KamBot mood="idle" size={110} className="animate-float" />
            <div className="text-center">
              <h2 className="text-white font-black text-2xl mb-1">Pick your avatar!</h2>
              <p className="text-white/60 font-bold text-sm">Who do you want to be?</p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              {avatars.map(av => (
                <motion.button
                  key={av.id}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLocalAvatar(av.id)}
                >
                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl ${av.bg}`}
                    style={{
                      border: localAvatar === av.id ? '3px solid #FFD700' : '3px solid transparent',
                      boxShadow: localAvatar === av.id ? '0 0 20px rgba(245,166,35,0.7)' : 'none',
                    }}
                  >
                    {av.emoji}
                  </div>
                  <span className="text-white/70 text-xs font-bold">{av.label}</span>
                </motion.button>
              ))}
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={goNext}>
              This is me! →
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center"
            variants={slideInFromRight} initial="initial" animate="animate" exit="exit"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3, 3, 0] }}
              transition={{ duration: 1.2, repeat: 2 }}
            >
              <KamBot mood="celebrate" size={140} />
            </motion.div>
            <div>
              <h2 className="text-kazakh-gold font-black text-3xl mb-2">
                Welcome, {localName}! 🎉
              </h2>
              <p className="text-white/70 font-bold text-base leading-relaxed px-2">
                I'm <span className="text-sky-blue font-black">KamBot</span> — your guide through Kazakhstan! 🇰🇿
                <br />
                <span className="text-kazakh-gold">+50 🪙 &amp; +30 ⭐ XP</span> just for joining!
              </p>
            </div>
            <div className="glass rounded-4xl p-4 w-full">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${avatars[localAvatar]?.bg}`}>
                  {avatars[localAvatar]?.emoji}
                </div>
                <div className="text-left">
                  <p className="text-white font-black">{localName}</p>
                  <p className="text-white/50 text-sm">Age {localAge} · Explorer Lv.1</p>
                </div>
                <div className="ml-auto text-kazakh-gold font-black">🪙 50</div>
              </div>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={finish}>
              🚀 Start Adventure!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
