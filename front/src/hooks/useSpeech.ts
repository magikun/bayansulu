import { usePlayerStore } from '@/store/playerStore'
import { useCallback } from 'react'

export function useSpeech() {
  const { language, soundMuted } = usePlayerStore()

  const speak = useCallback((text: string) => {
    if (soundMuted || !('speechSynthesis' in window)) return

    try {
      // Cancel any ongoing speaking queues to avoid laggy overlaps
      window.speechSynthesis.cancel()

      const textClean = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '') // strip emojis for smoother speech
      if (!textClean.trim()) return

      const utterance = new SpeechSynthesisUtterance(textClean)

      // Set target language locale
      const langCode = language === 'ru' ? 'ru-RU' : 'kk-KZ'
      utterance.lang = langCode

      // Load available local voices
      const voices = window.speechSynthesis.getVoices()
      
      // Try to find matching speech engine voice
      let voice = voices.find(v => v.lang.startsWith(langCode) || v.lang.includes(language.toUpperCase()))
      
      // Fallback: search for language letters matching
      if (!voice && language === 'kk') {
        // Kazakh TTS synthesis support is sometimes named kk, kk-KZ or tr-TR (as close Turkic group in some speech packs)
        voice = voices.find(v => v.lang.startsWith('kk') || v.lang.startsWith('tr'))
      }

      if (voice) {
        utterance.voice = voice
      }

      // Voice settings
      utterance.pitch = 1.3  // Slightly high pitch for cute baby-camel KamBot voice!
      utterance.rate = 1.05   // Keep speed engaging and energetic
      utterance.volume = 0.9  // 90% volume

      window.speechSynthesis.speak(utterance)
    } catch (e) {
      console.warn('Speech synthesis failed', e)
    }
  }, [language, soundMuted])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  return { speak, stopSpeaking }
}
