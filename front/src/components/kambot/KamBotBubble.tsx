import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useSpeech } from '@/hooks/useSpeech'

interface KamBotBubbleProps {
  message: string
  visible: boolean
  side?: 'left' | 'right'
}

export default function KamBotBubble({ message, visible, side = 'left' }: KamBotBubbleProps) {
  const { speak } = useSpeech()

  useEffect(() => {
    if (visible && message) {
      speak(message)
    }
  }, [message, visible, speak])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`absolute z-10 max-w-[180px] ${side === 'right' ? 'right-0' : 'left-0'}`}
          style={{ bottom: '110%' }}
          initial={{ scale: 0, opacity: 0, originY: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div
            className="glass rounded-3xl p-3 text-white text-xs font-bold leading-snug shadow-card relative cursor-pointer active:scale-98 select-none hover:border-white/20 transition-all duration-150"
            onClick={() => speak(message)}
          >
            <div className="flex gap-1 items-start">
              <span className="flex-1">{message}</span>
              <span className="text-kazakh-gold text-xs shrink-0 select-none">🔊</span>
            </div>
            {/* Tail */}
            <div
              className={`absolute bottom-[-8px] w-0 h-0
                ${side === 'right'
                  ? 'right-6 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-surface-purple/80'
                  : 'left-6 border-r-8 border-r-transparent border-l-0 border-t-8 border-t-surface-purple/80'
                }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
