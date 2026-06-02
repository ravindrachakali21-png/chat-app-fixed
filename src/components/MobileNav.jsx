import { MessageCircle, Users, Phone, Settings, Bell, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const MobileNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname.startsWith('/chat')
    return location.pathname.startsWith(path)
  }

  const tabs = [
    { path: '/', icon: MessageCircle, label: 'Chats' },
    { path: '/groups', icon: Users, label: 'Groups' },
    { path: '/calls', icon: Phone, label: 'Calls' },
    { path: '/updates', icon: Bell, label: 'Updates' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div style={{
      width: '100%',
      background: theme.headerBg,
      borderTop: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexShrink: 0,
      transition: 'background 0.3s',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      minHeight: '56px',
    }}>
      {tabs.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 10px',
            flex: 1,
            color: isActive(path) ? '#2563eb' : theme.textSecondary,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Icon size={21} color={isActive(path) ? '#2563eb' : theme.textSecondary} />
          <span style={{
            fontSize: '10px',
            fontWeight: isActive(path) ? 700 : 400,
            color: isActive(path) ? '#2563eb' : theme.textSecondary,
          }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default MobileNav
