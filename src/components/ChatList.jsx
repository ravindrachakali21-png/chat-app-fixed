import { Search, SlidersHorizontal, Archive, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useWindowSize'
import pinkPanda from '../assets/pink-panda.jpg'
import dogHat from '../assets/dog-hat.jpg'
import cuteTurtle from '../assets/cute-turtle.jpg'
import coolSpirit from '../assets/cool-spirit.jpg'
import strangeCat from '../assets/strange-cat.jpg'
import fireFox from '../assets/fire-fox.jpg'

const pinnedChats = [
  { id: 1, name: 'Pink Panda', message: 'You: thnx!', time: '9:36', avatar: pinkPanda, badge: null, online: true },
  { id: 2, name: 'Dog Hat', message: "It's so quite outside 🤨", time: '9:36', avatar: dogHat, badge: 2, online: true },
]
const allChats = [
  { id: 3, name: 'Cute Turtle', message: "That's It. Goodbye!", time: '9:36', avatar: cuteTurtle, badge: 3, online: true },
  { id: 4, name: 'Cool spirit', message: 'Look what I found', time: '9:36', avatar: coolSpirit, badge: null, online: true },
  { id: 5, name: 'strange cat', message: 'You: Hi, sorry to bother you...', time: '9:36', avatar: strangeCat, badge: null, online: true, chevron: true },
  { id: 6, name: 'Fire Fox', message: 'What does the fox says?', time: '9:36', avatar: fireFox, badge: null, online: false },
]
const allChatsFlat = [...pinnedChats, ...allChats]
const unreadChats = allChatsFlat.filter(c => c.badge)

const ChatItem = ({ chat, active, onClick, theme }) => (
  <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: active ? '#2563eb' : theme.bgCard, borderRadius: '16px', cursor: 'pointer', marginBottom: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: `1px solid ${theme.borderLight}`, transition: 'all 0.15s' }}>
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <img src={chat.avatar} alt={chat.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
      {chat.online && <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', background: '#22c55e', border: '2px solid white', borderRadius: '50%' }} />}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontWeight: 600, fontSize: '14.5px', color: active ? 'white' : theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.name}</span>
        <span style={{ fontSize: '12px', color: active ? 'rgba(255,255,255,0.7)' : theme.textSecondary, marginLeft: '8px', flexShrink: 0 }}>{chat.time}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: active ? 'rgba(255,255,255,0.75)' : theme.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '4px' }}>{chat.message}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {chat.chevron && !active && <ChevronDown size={14} color={theme.textSecondary} />}
          {chat.badge && <span style={{ width: '20px', height: '20px', background: active ? 'white' : '#2563eb', color: active ? '#2563eb' : 'white', fontSize: '10.5px', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chat.badge}</span>}
        </div>
      </div>
    </div>
  </div>
)

const ChatList = ({ activeId }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useIsMobile()
  const [filter, setFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleFilter = (value) => {
    setShowDropdown(false)
    if (value === 'archived') { navigate('/archive'); return }
    setFilter(value)
  }

  return (
    <div style={{
      width: isMobile ? '100%' : '360px',
      minWidth: isMobile ? 'unset' : '360px',
      height: '100%',
      background: theme.bgSecondary,
      display: 'flex',
      flexDirection: 'column',
      borderRight: isMobile ? 'none' : `1px solid ${theme.border}`,
      transition: 'all 0.3s'
    }}>

      {/* Header */}
      <div style={{ background: theme.headerBg, padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.3s' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: theme.text }}>Chats</h1>
        <svg onClick={() => navigate('/updates')} width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ cursor: 'pointer' }}>
          <circle cx="15" cy="15" r="12" stroke={theme.textSecondary} strokeWidth="1.8" strokeDasharray="4.5 3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Search */}
      <div style={{ background: theme.headerBg, padding: '0 16px 14px', transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: theme.bgInput, borderRadius: '14px', padding: '11px 16px' }}>
          <Search size={16} color={theme.textSecondary} />
          <input type="text" placeholder="Search" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: theme.text }} />
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <SlidersHorizontal size={16} color={filter !== 'all' ? '#2563eb' : theme.textSecondary} />
            </button>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '28px', right: '0', background: theme.bgCard, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', border: `1px solid ${theme.border}`, minWidth: '150px', zIndex: 100, overflow: 'hidden' }}>
                {[{ value: 'all', label: 'All chats' }, { value: 'unread', label: 'Unread' }, { value: 'archived', label: 'Archived' }].map(({ value, label }, i, arr) => (
                  <div key={value} onClick={() => handleFilter(value)} style={{ padding: '13px 18px', fontSize: '14px', fontWeight: filter === value ? 600 : 400, color: filter === value ? '#2563eb' : theme.text, background: filter === value ? '#EEF2FF' : theme.bgCard, cursor: 'pointer', borderBottom: i < arr.length - 1 ? `1px solid ${theme.borderLight}` : 'none' }}>
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Archived */}
      {filter === 'all' && (
        <div style={{ background: theme.headerBg, padding: '0 20px 16px', borderBottom: `1px solid ${theme.borderLight}`, transition: 'background 0.3s' }}>
          <button onClick={() => navigate('/archive')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontSize: '14px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            <Archive size={16} color="#2563eb" /> Archived
          </button>
        </div>
      )}

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', scrollbarWidth: 'none' }}>
        {filter === 'all' && (
          <>
            <p style={{ fontSize: '12.5px', fontWeight: 600, color: theme.textMuted, padding: '4px 6px 10px' }}>Pinned</p>
            {pinnedChats.map(chat => <ChatItem key={chat.id} chat={chat} active={activeId === chat.id} onClick={() => navigate(`/chat/${chat.id}`)} theme={theme} />)}
            <p style={{ fontSize: '12.5px', fontWeight: 600, color: theme.textMuted, padding: '14px 6px 10px' }}>All Chats</p>
            {allChats.map(chat => <ChatItem key={chat.id} chat={chat} active={activeId === chat.id} onClick={() => navigate(`/chat/${chat.id}`)} theme={theme} />)}
          </>
        )}
        {filter === 'unread' && (
          unreadChats.length > 0 ? (
            <>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: theme.textMuted, padding: '4px 6px 10px' }}>Unread</p>
              {unreadChats.map(chat => <ChatItem key={chat.id} chat={chat} active={activeId === chat.id} onClick={() => navigate(`/chat/${chat.id}`)} theme={theme} />)}
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '60px' }}>
              <p style={{ fontSize: '14px', color: theme.textSecondary, fontWeight: 500 }}>No Unread Messages</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ChatList