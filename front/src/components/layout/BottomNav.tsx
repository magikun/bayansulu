import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const TABS = [
  { to: '/map',     icon: '🗺️',  label: 'Map' },
  { to: '/games/memory', icon: '🎮', label: 'Games' },
  { to: '/rewards', icon: '🏆', label: 'Rewards' },
  { to: '/parent',  icon: '👤',  label: 'Parent' },
]

export default function BottomNav() {
  return (
    <nav className="glass-dark sticky bottom-0 z-40 flex items-stretch border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className="flex-1"
        >
          {({ isActive }) => (
            <motion.div
              className="flex flex-col items-center justify-center py-2 gap-0.5 relative"
              whileTap={{ scale: 0.88 }}
            >
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-kazakh-gold"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.span
                className="text-xl"
                animate={{ scale: isActive ? 1.22 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {tab.icon}
              </motion.span>
              <span
                className="text-[10px] font-bold"
                style={{ color: isActive ? '#F5A623' : 'rgba(255,255,255,0.45)' }}
              >
                {tab.label}
              </span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
