import { motion, AnimatePresence } from 'framer-motion'

interface KamBotBubbleProps {
  message: string
  visible: boolean
  side?: 'left' | 'right'
}

export default function KamBotBubble({ message, visible, side = 'left' }: KamBotBubbleProps) {
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
          <div className="glass rounded-3xl p-3 text-white text-sm font-bold leading-snug shadow-card relative">
            {message}
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
