import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDark = () => setDarkMode(prev => !prev)

  const theme = {
    darkMode, toggleDark,
    bg: darkMode ? '#1e1e2e' : '#ffffff',
    bgSecondary: darkMode ? '#2a2a3e' : '#F4F6FB',
    bgCard: darkMode ? '#2a2a3e' : '#ffffff',
    bgInput: darkMode ? '#3a3a4e' : '#F4F6FB',
    border: darkMode ? '#3a3a4e' : '#e5e7eb',
    borderLight: darkMode ? '#3a3a4e' : '#f3f4f6',
    text: darkMode ? '#f1f5f9' : '#111827',
    textSecondary: darkMode ? '#94a3b8' : '#9ca3af',
    textMuted: darkMode ? '#64748b' : '#6b7280',
    msgBg: darkMode ? '#2d2d42' : '#ffffff',
    chatBg: darkMode ? '#1a1a2e' : '#F8F9FE',
    sidebarBg: darkMode ? '#16162a' : '#F4F6FB',
    headerBg: darkMode ? '#1e1e2e' : '#ffffff',
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)