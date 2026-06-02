import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useWindowSize'
import chatIllustration from '../assets/chat-illustration.svg'

const EmptyState = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <div style={{ flex: 1, height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
      <img src={chatIllustration} alt="Select a conversation" style={{ width: '260px', height: '260px', objectFit: 'contain', marginBottom: '32px' }} />
      <p style={{ fontSize: '15px', fontWeight: 600, color: theme.text }}>
        Select a conversation or start a{' '}
        <button style={{ color: '#2563eb', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '15px' }}>new one</button>
      </p>
    </div>
  )
}

export default EmptyState