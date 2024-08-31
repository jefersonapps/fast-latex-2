import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
    return storedTheme ? storedTheme : 'system'
  })

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const applyTheme = (): void => {
      if (
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        setCurrentTheme('dark')
      } else {
        document.documentElement.classList.remove('dark')
        setCurrentTheme('light')
      }
    }

    applyTheme()

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (): void => applyTheme()
      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }

    return () => {}
  }, [theme])

  const setThemePreference = (newTheme: 'light' | 'dark' | 'system'): void => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, currentTheme, setThemePreference }
}
