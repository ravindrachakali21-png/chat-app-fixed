import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, Phone, Video, ChevronDown, Link, Smile, Send, Download, PhoneOff, ArrowLeft } from 'lucide-react'
import ChatList from './ChatList'
import { StarredPanel, MediaPanel, ContactPanel } from './RightPanel'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useWindowSize'
import abstractImg from '../assets/abstract-img.jpg'
import pinkPanda from '../assets/pink-panda.jpg'
import dogHat from '../assets/dog-hat.jpg'
import cuteTurtle from '../assets/cute-turtle.jpg'
import coolSpirit from '../assets/cool-spirit.jpg'
import strangeCat from '../assets/strange-cat.jpg'
import fireFox from '../assets/fire-fox.jpg'
import videoBg from '../assets/video-call-bg.jpg'
import videoThumb from '../assets/video-call-thumb.jpg'
import camel from '../assets/camel.jpg'
import horse from '../assets/horse.jpg'

const chatData = {
  1: { name: 'Pink Panda', status: 'Online', avatar: pinkPanda, messages: [{ id: 1, text: 'Hi 👋, How are ya ?', time: '0:12', mine: false }, { id: 2, divider: 'Today' }, { id: 3, text: 'Hi 👋 Panda, not bad, u ?', time: '8:17', mine: true }, { id: 4, text: 'Can you send me an abstract image?', time: '8:17', mine: true }, { id: 5, type: 'image', time: '10:35', mine: false }, { id: 6, type: 'reaction', text: '🔥 1' }, { id: 7, text: 'Can you send it as file ?', time: '11:12', mine: true }, { id: 8, type: 'file', name: 'Abstract.png', time: '11:25', mine: false }, { id: 9, text: 'Thnx!', time: '11:28', mine: true }] },
  2: { name: 'Dog Hat', status: 'Online', avatar: dogHat, messages: [{ id: 1, text: 'Hey! Are you there?', time: '9:10', mine: false }, { id: 2, text: "Yeah! What's up?", time: '9:12', mine: true }, { id: 3, divider: 'Today' }, { id: 4, text: "It's so quite outside 🤨", time: '9:36', mine: false }, { id: 5, text: 'Yeah, very peaceful today!', time: '9:38', mine: true }] },
  3: { name: 'Cute Turtle', status: 'Online', avatar: cuteTurtle, messages: [{ id: 1, text: 'Hey, can we talk later?', time: '8:00', mine: false }, { id: 2, divider: 'Today' }, { id: 3, text: "That's It. Goodbye!", time: '9:36', mine: false }, { id: 4, text: 'Take care! 👋', time: '9:37', mine: true }] },
  4: { name: 'Cool spirit', status: 'Online', avatar: coolSpirit, messages: [{ id: 1, divider: 'Today' }, { id: 2, text: 'Look what I found', time: '9:36', mine: false }, { id: 3, type: 'image', time: '9:36', mine: false }, { id: 4, text: "Wow that's amazing! 😮", time: '9:38', mine: true }] },
  5: { name: 'strange cat', status: 'Online', avatar: strangeCat, messages: [{ id: 1, divider: 'Today' }, { id: 2, text: 'Hi, sorry to bother you...', time: '9:36', mine: false }, { id: 3, text: "No worries! What's going on?", time: '9:38', mine: true }] },
  6: { name: 'Fire Fox', status: 'Offline', avatar: fireFox, messages: [{ id: 1, divider: 'Today' }, { id: 2, text: 'What does the fox says?', time: '9:36', mine: false }, { id: 3, text: 'Hahaha 😂 Ring-ding-ding!', time: '9:40', mine: true }] },
}

const MessageList = ({ theme, messages, isMobile }) => (
  <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '12px' : '20px', scrollbarWidth: 'none', background: theme.chatBg, transition: 'background 0.3s' }}>
    {messages.map(msg => {
      if (msg.divider) return (
        <div key={msg.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
          <div style={{ flex: 1, height: '1px', background: theme.border }} />
          <span style={{ fontSize: '12px', color: theme.textSecondary }}>{msg.divider}</span>
          <div style={{ flex: 1, height: '1px', background: theme.border }} />
        </div>
      )
      if (msg.type === 'image') return (
        <div key={msg.id} style={{ display: 'flex', justifyContent: msg.mine ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
          <div style={{ background: theme.msgBg, borderRadius: '18px', padding: '8px', display: 'inline-block', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <img src={abstractImg} alt="img" style={{ width: isMobile ? '150px' : '180px', height: isMobile ? '120px' : '150px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
            <p style={{ fontSize: '11px', color: theme.textSecondary, marginTop: '4px', textAlign: 'right' }}>{msg.time}</p>
          </div>
        </div>
      )
      if (msg.type === 'reaction') return <div key={msg.id} style={{ marginBottom: '8px' }}><span style={{ fontSize: '13px' }}>{msg.text}</span></div>
      if (msg.type === 'file') return (
        <div key={msg.id} style={{ marginBottom: '8px' }}>
          <div style={{ background: theme.msgBg, borderRadius: '16px', padding: '12px 16px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: '18px' }}>🖼️</span>
            <span style={{ fontSize: '14px', color: theme.text, fontWeight: 500 }}>{msg.name}</span>
            <Download size={18} color={theme.textSecondary} />
          </div>
          <p style={{ fontSize: '11px', color: theme.textSecondary, marginTop: '4px' }}>{msg.time}</p>
        </div>
      )
      return (
        <div key={msg.id} style={{ display: 'flex', justifyContent: msg.mine ? 'flex-end' : 'flex-start', marginBottom: '6px' }}>
          <div style={{ background: msg.mine ? '#2563eb' : theme.msgBg, borderRadius: msg.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', maxWidth: '70%', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '14px', color: msg.mine ? 'white' : theme.text }}>{msg.text}</p>
            <p style={{ fontSize: '11px', color: msg.mine ? 'rgba(255,255,255,0.65)' : theme.textSecondary, marginTop: '4px', textAlign: 'right' }}>{msg.time}</p>
          </div>
        </div>
      )
    })}
  </div>
)

const Dashboard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useIsMobile()
  const chat = chatData[parseInt(id)] || chatData[1]
  const [showVideo, setShowVideo] = useState(false)
  const [showAudio, setShowAudio] = useState(false)
  const [audioConnected, setAudioConnected] = useState(false)
  const [rightPanel, setRightPanel] = useState(null)
  const [inputMsg, setInputMsg] = useState('')
  const [extraMessages, setExtraMessages] = useState({})

  const handleAudioCall = () => {
    setShowAudio(true)
    setShowVideo(false)
    setAudioConnected(false)
    setTimeout(() => setAudioConnected(true), 2000)
  }

  const sendMessage = () => {
    if (!inputMsg.trim()) return
    const newMsg = { id: Date.now(), text: inputMsg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true }
    setExtraMessages(prev => ({ ...prev, [id]: [...(prev[id] || []), newMsg] }))
    setInputMsg('')
  }

  const allMessages = [...(chat.messages || []), ...(extraMessages[id] || [])]

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>

      {/* Hide ChatList on mobile */}
      {!isMobile && <ChatList activeId={parseInt(id)} />}

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: theme.headerBg, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.border}`, flexShrink: 0, transition: 'background 0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isMobile && (
              <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                <ArrowLeft size={22} color={theme.text} />
              </button>
            )}
            <div style={{ position: 'relative' }}>
              <img src={chat.avatar} alt={chat.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', background: chat.status === 'Online' ? '#22c55e' : '#9ca3af', border: '2px solid white', borderRadius: '50%' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', color: theme.text }}>{chat.name}</p>
              <p style={{ fontSize: '12px', color: chat.status === 'Online' ? '#22c55e' : theme.textSecondary }}>{chat.status}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Video size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} onClick={() => { setShowVideo(true); setShowAudio(false) }} />
            <Phone size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} onClick={handleAudioCall} />
            <Search size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} />
            {!isMobile && <>
              <div style={{ width: '1px', height: '20px', background: theme.border }} />
              <ChevronDown size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} onClick={() => setRightPanel(rightPanel ? null : 'contact')} />
            </>}
          </div>
        </div>

        {/* Messages */}
        <MessageList theme={theme} messages={allMessages} isMobile={isMobile} />

        {/* Input */}
        <div style={{ background: theme.headerBg, padding: '12px 16px', borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, transition: 'background 0.3s' }}>
          <Link size={20} color={theme.textSecondary} style={{ cursor: 'pointer', flexShrink: 0 }} />
          <input type="text" placeholder="Write a message ..." value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: theme.text, background: 'transparent' }} />
          <Smile size={20} color={theme.textSecondary} style={{ cursor: 'pointer', flexShrink: 0 }} />
          <div onClick={sendMessage} style={{ width: '38px', height: '38px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Send size={18} color="white" />
          </div>
        </div>

        {/* Video Call Overlay */}
        {showVideo && (
          <div style={{ position: 'absolute', top: isMobile ? '0' : '19px', right: isMobile ? '0' : '19px', left: isMobile ? '0' : 'auto', bottom: isMobile ? '0' : 'auto', width: isMobile ? '100%' : 'calc(100% - 40px)', maxWidth: isMobile ? '100%' : '705px', height: isMobile ? '100%' : '454px', borderRadius: isMobile ? '0' : '24px', overflow: 'hidden', zIndex: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <img src={videoBg} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', top: '14px', right: '14px', width: isMobile ? '90px' : '160px', height: isMobile ? '60px' : '100px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
              <img src={videoThumb} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)' }}>
              <button onClick={() => setShowVideo(false)} style={{ width: '64px', height: '42px', background: '#ef4444', border: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <PhoneOff size={20} color="white" />
              </button>
            </div>
          </div>
        )}

        {/* Audio Call Overlay */}
        {showAudio && (
          <div style={{ position: 'absolute', top: isMobile ? '0' : '19px', right: isMobile ? '0' : '19px', left: isMobile ? '0' : 'auto', bottom: isMobile ? '0' : 'auto', width: isMobile ? '100%' : 'calc(100% - 40px)', maxWidth: isMobile ? '100%' : '705px', height: isMobile ? '100%' : '454px', background: theme.bgCard, zIndex: 20, borderRadius: isMobile ? '0' : '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', transition: 'background 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '24px' : '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src={camel} alt="Camel" style={{ width: isMobile ? '72px' : '100px', height: isMobile ? '72px' : '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.border}` }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: theme.text }}>Camel</span>
              </div>
              <svg width="60" height="24" viewBox="0 0 80 30">
                <path d="M0 15 Q10 5 20 15 Q30 25 40 15 Q50 5 60 15 Q70 25 80 15" stroke="#93c5fd" strokeWidth="2" fill="none" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src={horse} alt="Horse" style={{ width: isMobile ? '72px' : '100px', height: isMobile ? '72px' : '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.border}` }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: theme.text }}>Horse</span>
              </div>
            </div>
            {audioConnected ? (
              <>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#22c55e' }}>Connected</p>
                <p style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 700, color: theme.text }}>12 : 32</p>
              </>
            ) : <p style={{ fontSize: '20px', fontWeight: 700, color: theme.text }}>Connecting...</p>}
            <button onClick={() => { setShowAudio(false); setAudioConnected(false) }} style={{ background: theme.bgCard, border: '1.5px solid #ef4444', color: '#ef4444', borderRadius: '10px', padding: '10px 32px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Hang Up
            </button>
          </div>
        )}
      </div>

      {/* Right Panels - desktop only */}
      {!isMobile && rightPanel === 'contact' && <ContactPanel onClose={() => setRightPanel(null)} onMediaClick={() => setRightPanel('media')} onStarredClick={() => setRightPanel('starred')} />}
      {!isMobile && rightPanel === 'media' && <MediaPanel onClose={() => setRightPanel('contact')} />}
      {!isMobile && rightPanel === 'starred' && <StarredPanel onClose={() => setRightPanel('contact')} />}
    </div>
  )
}

export default Dashboard