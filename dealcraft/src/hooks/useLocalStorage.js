import { useEffect, useState } from 'react'

// Persists a piece of state to localStorage (Section 6: "Penyimpanan sementara via LocalStorage").
// Falls back gracefully if localStorage is unavailable (e.g. private browsing).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore quota/availability errors — the app still works in-memory.
    }
  }, [key, value])

  return [value, setValue]
}
