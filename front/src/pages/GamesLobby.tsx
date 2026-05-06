import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import HUDBar from '@/components/layout/HUDBar'
import BottomNav from '@/components/layout/BottomNav'
import KamBot from '@/components/kambot/KamBot'
import { usePlayerStore } from '@/store/playerStore'
import { useGameStore } from '@/store/gameStore'
import { getTranslation } from '@/data/locale'
import { pageVariants } from '@/hooks/useAnimation'

interface LobbyGame {
  id: string
  to: string
  emoji: string
  color: string
  nameRu: string
  nameKk: string
  descRu: string
  descKk: string
  locRu: string
  locKk: string
}

const LOBBY_GAMES: LobbyGame[] = [
  {
    id: 'memory',
    to: '/games/memory',
    emoji: '🧠',
    color: 'from-[#FF4D9E] to-[#FF6B35]',
    nameRu: 'Собери сладости 🍬',
    nameKk: 'Тәттілерді жина 🍬',
    descRu: 'Найди пары одинаковых сладостей и казахских символов на время!',
    descKk: 'Уақытқа бірдей тәттілер мен қазақша белгілердің жұбын тап!',
    locRu: 'Алматы 🍎',
    locKk: 'Алматы 🍎',
  },
  {
    id: 'yurt',
    to: '/games/yurt',
    emoji: '🏕️',
    color: 'from-[#00E5A0] to-[#00B4D8]',
    nameRu: 'Сборка Юрты 🏕️',
    nameKk: 'Киіз үй құрау 🏕️',
    descRu: 'Собери традиционную юрту деталь за деталью и укрась её коврами!',
    descKk: 'Дәстүрлі киіз үйді бөлшектеп құрап, кілемдермен сәнде!',
    locRu: 'Туркестан 🏛️',
    locKk: 'Түркістан 🏛️',
  },
  {
    id: 'math',
    to: '/games/math',
    emoji: '🔢',
    color: 'from-[#7B2CBF] to-[#9D4EDD]',
    nameRu: 'Счёт с Ботой 🔢',
    nameKk: 'Ботамен санау 🔢',
    descRu: 'Решай примеры на сложение и вычитание, побеждая сладких монстров!',
    descKk: 'Тәтті құбыжықтарды жеңіп, қосу мен азайту есептерін шығар!',
    locRu: 'Великая Степь 🌾',
    locKk: 'Ұлы Дала 🌾',
  },
  {
    id: 'quiz',
    to: '/games/quiz',
    emoji: '🏆',
    color: 'from-[#00B4D8] to-[#0077B6]',
    nameRu: 'Викторина КамБота 🏆',
    nameKk: 'КамБот викторинасы 🏆',
    descRu: 'Ответь на вопросы о географии, культуре и традициях Казахстана!',
    descKk: 'Қазақстанның географиясы, мәдениеті мен дәстүрлері туралы сұрақтарға жауап бер!',
    locRu: 'Астана 🏙️',
    locKk: 'Астана 🏙️',
  },
  {
    id: 'runner',
    to: '/games/runner',
    emoji: '🐪',
    color: 'from-[#FF6B35] to-[#F5A623]',
    nameRu: 'Camel Runner 🐪',
    nameKk: 'Camel Runner 🐪',
    descRu: 'Помоги верблюжонку бежать по Чарыну, собирая монеты и уворачиваясь от кактусов!',
    descKk: 'Түйеге Шарын шатқалымен жүгіріп, тиындар жинауға көмектес!',
    locRu: 'Чарынский каньон 🏔️',
    locKk: 'Шарын шатқалы 🏔️',
  },
]

export default function GamesLobby() {
  const language = usePlayerStore(s => s.language)
  const highScores = useGameStore(s => s.highScores)
  const navigate = useNavigate()
  const t = getTranslation(language)

  const titleStr = language === 'ru' ? '🎮 Игротека «Бота»' : '🎮 Бота Ойындары'
  const descStr  = language === 'ru' ? 'Выбери любое приключение!' : 'Кез келген саяхатты таңда!'

  return (
    <motion.div
      className="min-h-dvh flex flex-col bg-deep-navy"
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
    >
      <HUDBar />

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-white font-black text-2xl text-gradient-gold">
            {titleStr}
          </h1>
          <p className="text-white/40 text-xs font-bold">{descStr}</p>
        </div>

        {/* List of games */}
        <div className="space-y-3">
          {LOBBY_GAMES.map((game, i) => {
            const name = language === 'ru' ? game.nameRu : game.nameKk
            const desc = language === 'ru' ? game.descRu : game.descKk
            const loc  = language === 'ru' ? game.locRu  : game.locKk
            const hs   = highScores[game.id] ?? 0

            return (
              <motion.div
                key={game.id}
                className="glass rounded-4xl p-4 flex gap-3 items-center relative overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-150"
                onClick={() => navigate(game.to)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Diagonal background glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${game.color} opacity-10 blur-xl pointer-events-none`} />

                {/* Game Icon */}
                <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl shrink-0 shadow-lg`}>
                  {game.emoji}
                </div>

                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-black text-sm mb-0.5 truncate">{name}</h3>
                  <p className="text-white/50 text-[10px] font-medium leading-relaxed mb-1.5">
                    {desc}
                  </p>
                  
                  {/* Footer labels */}
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-wider">
                    <span className="text-[#00B4D8] bg-[#00B4D8]/10 px-1.5 py-0.5 rounded-full">
                      📍 {loc}
                    </span>
                    {hs > 0 && (
                      <span className="text-kazakh-gold bg-kazakh-gold/10 px-1.5 py-0.5 rounded-full">
                        🏆 {t.gameScore}: {hs}
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <div className="text-white/20 font-bold shrink-0 text-sm">▶</div>
              </motion.div>
            )
          })}
        </div>

        {/* Mascot */}
        <div className="flex flex-col items-center py-2">
          <KamBot mood="happy" size={80} className="animate-float" />
        </div>
      </div>

      <BottomNav />
    </motion.div>
  )
}
