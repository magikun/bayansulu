import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Badge } from '@/types'
import { badgeDefinitions } from '@/data/mockData'

interface PlayerState {
  name: string
  age: number
  avatarId: number
  level: number
  xp: number
  xpToNext: number
  botacoins: number
  streak: number
  badges: Badge[]
  completedGames: string[]
  onboardingComplete: boolean

  setName: (name: string) => void
  setAge: (age: number) => void
  setAvatar: (id: number) => void
  completeOnboarding: () => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  unlockBadge: (badgeId: string) => void
  completeGame: (gameId: string) => void
  incrementStreak: () => void
  reset: () => void
}

const initialState = {
  name: '',
  age: 8,
  avatarId: 0,
  level: 1,
  xp: 0,
  xpToNext: 100,
  botacoins: 0,
  streak: 1,
  badges: badgeDefinitions,
  completedGames: [] as string[],
  onboardingComplete: false,
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setName: (name) => set({ name }),
      setAge: (age) => set({ age }),
      setAvatar: (avatarId) => set({ avatarId }),
      completeOnboarding: () => set({ onboardingComplete: true }),

      addXP: (amount) => {
        const { xp, xpToNext, level } = get()
        const newXP = xp + amount
        if (newXP >= xpToNext) {
          set({ level: level + 1, xp: newXP - xpToNext, xpToNext: xpToNext + 50 })
        } else {
          set({ xp: newXP })
        }
      },

      addCoins: (amount) => set(s => ({ botacoins: s.botacoins + amount })),

      unlockBadge: (badgeId) =>
        set(s => ({
          badges: s.badges.map(b =>
            b.id === badgeId ? { ...b, earned: true, earnedAt: new Date().toISOString() } : b
          ),
        })),

      completeGame: (gameId) =>
        set(s => ({
          completedGames: Array.from(new Set([...s.completedGames, gameId])),
        })),

      incrementStreak: () => set(s => ({ streak: s.streak + 1 })),

      reset: () => set({ ...initialState, badges: badgeDefinitions }),
    }),
    { name: 'bayan-sulu-player' }
  )
)
