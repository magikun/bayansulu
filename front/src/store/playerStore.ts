import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Badge, Coupon } from '@/types'
import { badgeDefinitions } from '@/data/mockData'
import { api } from '@/services/api'

interface PlayerState {
  playerId: string
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
  language: 'ru' | 'kk'
  soundMuted: boolean
  purchasedCoupons: Coupon[]

  setName: (name: string) => void
  setAge: (age: number) => void
  setAvatar: (id: number) => void
  completeOnboarding: () => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  unlockBadge: (badgeId: string) => void
  completeGame: (gameId: string) => void
  incrementStreak: () => void
  setLanguage: (lang: 'ru' | 'kk') => void
  setSoundMuted: (muted: boolean) => void
  buyPrize: (prizeId: string, cost: number) => boolean
  sync: () => Promise<void>
  reset: () => void
}

const initialState = {
  playerId: '',
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
  language: 'ru' as const,
  soundMuted: false,
  purchasedCoupons: [] as Coupon[],
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setName: (name) => {
        set({ name })
        get().sync()
      },
      setAge: (age) => {
        set({ age })
        get().sync()
      },
      setAvatar: (avatarId) => {
        set({ avatarId })
        get().sync()
      },
      completeOnboarding: () => {
        set({ onboardingComplete: true })
        get().sync()
      },

      addXP: (amount) => {
        const { xp, xpToNext, level } = get()
        const newXP = xp + amount
        if (newXP >= xpToNext) {
          set({ level: level + 1, xp: newXP - xpToNext, xpToNext: xpToNext + 50 })
        } else {
          set({ xp: newXP })
        }
        get().sync()
      },

      addCoins: (amount) => {
        set(s => ({ botacoins: Math.max(0, s.botacoins + amount) }))
        get().sync()
      },

      unlockBadge: (badgeId) => {
        set(s => ({
          badges: s.badges.map(b =>
            b.id === badgeId ? { ...b, earned: true, earnedAt: new Date().toISOString() } : b
          ),
        }))
        get().sync()
      },

      completeGame: (gameId) => {
        set(s => ({
          completedGames: Array.from(new Set([...s.completedGames, gameId])),
        }))
        get().sync()
      },

      incrementStreak: () => {
        set(s => ({ streak: s.streak + 1 }))
        get().sync()
      },

      setLanguage: (language) => set({ language }),

      setSoundMuted: (soundMuted) => set({ soundMuted }),

      buyPrize: (prizeId, cost) => {
        const { botacoins, purchasedCoupons } = get()
        if (botacoins < cost) return false

        // Generate a clean coupon code like BS-BOTA-500-XXXXX
        const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase()
        const code = `BS-BOTA-${cost}-${randomHex}`
        
        const newCoupon: Coupon = {
          id: `c-${Date.now()}-${randomHex}`,
          prizeId,
          code,
          purchasedAt: new Date().toISOString(),
          used: false,
        }

        set({
          botacoins: botacoins - cost,
          purchasedCoupons: [...purchasedCoupons, newCoupon],
        })
        get().sync()
        return true
      },

      sync: async () => {
        const { name, age, avatarId, level, xp, botacoins, streak, badges, playerId } = get()
        if (!name) return // skip sync if onboarding name isn't set yet

        try {
          const res = await api.syncPlayer({
            name,
            age,
            avatarId,
            level,
            xp,
            botacoins: botacoins,
            streak,
            unlockedBadges: badges.filter(b => b.earned).map(b => b.id)
          }, playerId || undefined)

          if (res.id && res.id !== playerId) {
            set({ playerId: res.id })
          }
          console.log('[PlayerStore] Successfully synced profile with FastAPI. PlayerID:', res.id)
        } catch (e) {
          console.warn('[PlayerStore] Backend offline or unreachable. Running in resilient local-only mode:', e)
        }
      },

      reset: () => set({ ...initialState, badges: badgeDefinitions }),
    }),
    { name: 'bayan-sulu-player' }
  )
)
