import { useState } from 'react'
import { Search, Phone, Video, X, ArrowUpRight, Download, Smile, Send, Link, ChevronDown, PhoneOff, ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useWindowSize'
import pinkPanda from '../assets/pink-panda.jpg'
import dogHat from '../assets/dog-hat.jpg'
import cuteTurtle from '../assets/cute-turtle.jpg'
import coolSpirit from '../assets/cool-spirit.jpg'
import strangeCat from '../assets/strange-cat.jpg'
import dinesh from '../assets/dinesh.jpg'
import abstractImg from '../assets/abstract-img.jpg'
import videoBg from '../assets/video-call-bg.jpg'
import videoThumb from '../assets/video-call-thumb.jpg'
import camel from '../assets/camel.jpg'
import horse from '../assets/horse.jpg'

const calls = [
  { id: 1, name: 'Dinesh', time: 'Yesterday, 21:29', avatar: dinesh, type: 'audio' },
  { id: 2, name: 'Dog Hat', time: 'Yesterday, 16:53', avatar: dogHat, type: 'audio' },
  { id: 3, name: 'Cute Turtle', time: 'Yesterday, 16:53', avatar: cuteTurtle, type: 'audio' },
  { id: 4, name: 'Cool spirit', time: 'Yesterday, 16:53', avatar: coolSpirit, type: 'video' },
  { id: 5, name: 'strange cat', time: 'Yesterday, 16:53', avatar: strangeCat, type: 'video' },
]

const chatMessages = [
  { id: 1, text: 'Hi 👋, How are ya ?', time: '0:12', mine: false },
  { id: 2, divider: 'Today' },
  { id: 3, text: 'Hi 👋 Panda, not bad, u ?', time: '8:17', mine: true },
  { id: 4, text: 'Can you send me an abstract image?', time: '8:17', mine: true },
  { id: 5, type: 'image', time: '10:35', mine: false },
  { id: 6, type: 'reaction', text: '🔥 1', mine: false },
  { id: 7, text: 'Can you send it as file ?', time: '11:12', mine: true },
  { id: 8, type: 'file', name: 'Abstract.png', time: '11:25', mine: false },
  { id: 9, text: 'Thnx!', time: '11:28', mine: true },
]

const CallLog = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const [showModal, setShowModal] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showAudio, setShowAudio] = useState(false)
  const [audioConnected, setAudioConnected] = useState(false)
  const [activeCall, setActiveCall] = useState(null)
  const [inputMsg, setInputMsg] = useState('')
  const [extraMessages, setExtraMessages] = useState([])
  // mobile: null = list, 'chat' = chat window
  const [mobileView, setMobileView] = useState('list')

  const handleAudioCall = (call) => {
    setActiveCall(call)
    setShowAudio(true)
    setShowVideo(false)
    setAudioConnected(false)
    setTimeout(() => setAudioConnected(true), 2000)
    if (isMobile) setMobileView('chat')
  }

  const handleVideoCall = (call) => {
    setActiveCall(call)
    setShowVideo(true)
    setShowAudio(false)
    if (isMobile) setMobileView('chat')
  }

  const sendMessage = () => {
    if (!inputMsg.trim()) return
    setExtraMessages(prev => [...prev, {
      id: Date.now(),
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true
    }])
    setInputMsg('')
  }

  const allMessages = [...chatMessages, ...extraMessages]

  // ── Call List Panel ──────────────────────────────────────────────────────────
  const CallListPanel = () => (
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
      <div style={{ background: theme.headerBg, padding: '20px 20px 16px', transition: 'background 0.3s' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: theme.text }}>Call Log</h1>
      </div>

      {/* Search */}
      <div style={{ background: theme.headerBg, padding: '0 16px 14px', transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: theme.bgInput, borderRadius: '14px', padding: '11px 16px' }}>
          <Search size={16} color={theme.textSecondary} />
          <input type="text" placeholder="Search" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: theme.text }} />
        </div>
      </div>

      {/* Start new conversation */}
      <div style={{ background: theme.headerBg, padding: '0 20px 16px', borderBottom: `1px solid ${theme.borderLight}`, transition: 'background 0.3s' }}>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: '14px', fontWeight: 600 }}>
          Start new conversation
          <Phone size={18} color="#2563eb" />
        </button>
      </div>

      {/* Calls List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', scrollbarWidth: 'none' }}>
        {calls.map(call => (
          <div key={call.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: theme.bgCard, borderRadius: '16px', cursor: 'pointer', marginBottom: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: `1px solid ${theme.borderLight}` }}>
            <img src={call.avatar} alt={call.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }} onClick={() => isMobile && setMobileView('chat')}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: theme.text, marginBottom: '3px' }}>{call.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpRight size={13} color="#22c55e" />
                <span style={{ fontSize: '12.5px', color: theme.textSecondary }}>{call.time}</span>
              </div>
            </div>
            <div
              onClick={() => call.type === 'audio' ? handleAudioCall(call) : handleVideoCall(call)}
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              {call.type === 'audio' ? <Phone size={18} color="#22c55e" /> : <Video size={18} color="#22c55e" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Chat Window Panel ────────────────────────────────────────────────────────
  const ChatWindowPanel = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', background: theme.chatBg, transition: 'background 0.3s' }}>

      {/* Chat Header */}
      <div style={{ background: theme.headerBg, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.border}`, flexShrink: 0, transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isMobile && (
            <button onClick={() => { setMobileView('list'); setShowAudio(false); setShowVideo(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} color={theme.text} />
            </button>
          )}
          <div style={{ position: 'relative' }}>
            <img src={pinkPanda} alt="Pink Panda" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', background: '#22c55e', border: '2px solid white', borderRadius: '50%' }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '15px', color: theme.text }}>Pink Panda</p>
            <p style={{ fontSize: '12px', color: '#22c55e' }}>Online</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div onClick={() => handleVideoCall({ name: 'Pink Panda', avatar: pinkPanda })} style={{ cursor: 'pointer' }}>
            <Video size={20} color={theme.textSecondary} />
          </div>
          <div onClick={() => handleAudioCall({ name: 'Pink Panda', avatar: pinkPanda })} style={{ cursor: 'pointer' }}>
            <Phone size={20} color={theme.textSecondary} />
          </div>
          <Search size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} />
          {!isMobile && <>
            <div style={{ width: '1px', height: '20px', background: theme.border }} />
            <ChevronDown size={20} color={theme.textSecondary} style={{ cursor: 'pointer' }} />
          </>}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', scrollbarWidth: 'none' }}>
        {allMessages.map(msg => {
          if (msg.divider) return (
            <div key={msg.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
              <div style={{ flex: 1, height: '1px', background: theme.border }} />
              <span style={{ fontSize: '12px', color: theme.textSecondary }}>{msg.divider}</span>
              <div style={{ flex: 1, height: '1px', background: theme.border }} />
            </div>
          )
          if (msg.type === 'image') return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
              <div style={{ background: theme.msgBg, borderRadius: '18px', padding: '8px', display: 'inline-block', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <img src={abstractImg} alt="Abstract" style={{ width: isMobile ? '150px' : '180px', height: isMobile ? '120px' : '150px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
                <p style={{ fontSize: '11px', color: theme.textSecondary, marginTop: '4px', textAlign: 'right' }}>{msg.time}</p>
              </div>
            </div>
          )
          if (msg.type === 'reaction') return (
            <div key={msg.id} style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>{msg.text}</span>
            </div>
          )
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
        <div style={{ position: 'absolute', top: '19px', right: isMobile ? '0' : '19px', left: isMobile ? '0' : 'auto', width: isMobile ? '100%' : 'calc(100% - 40px)', maxWidth: isMobile ? '100%' : '705px', height: isMobile ? '300px' : '454px', borderRadius: isMobile ? '0 0 24px 24px' : '30px', overflow: 'hidden', zIndex: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <img src={videoBg} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', top: '14px', right: '14px', width: isMobile ? '90px' : '170px', height: isMobile ? '60px' : '110px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
            <img src={videoThumb} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)' }}>
            <button onClick={() => setShowVideo(false)} style={{ width: '64px', height: '42px', background: '#ef4444', border: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(239,68,68,0.6)' }}>
              <PhoneOff size={20} color="white" />
            </button>
          </div>
        </div>
      )}

      {/* Audio Call Overlay */}
      {showAudio && (
        <div style={{ position: 'absolute', top: '19px', right: isMobile ? '0' : '19px', left: isMobile ? '0' : 'auto', width: isMobile ? '100%' : 'calc(100% - 40px)', maxWidth: isMobile ? '100%' : '705px', height: isMobile ? '360px' : '454px', background: theme.bgCard, zIndex: 20, borderRadius: isMobile ? '0 0 24px 24px' : '30px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', transition: 'background 0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '24px' : '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <img src={activeCall?.avatar || camel} alt={activeCall?.name || 'Caller'} style={{ width: isMobile ? '72px' : '100px', height: isMobile ? '72px' : '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.border}` }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: theme.text }}>{activeCall?.name || 'Caller'}</span>
            </div>
            <svg width="50" height="20" viewBox="0 0 80 30">
              <path d="M0 15 Q10 5 20 15 Q30 25 40 15 Q50 5 60 15 Q70 25 80 15" stroke="#93c5fd" strokeWidth="2" fill="none" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <img src={pinkPanda} alt="You" style={{ width: isMobile ? '72px' : '100px', height: isMobile ? '72px' : '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${theme.border}` }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: theme.text }}>You</span>
            </div>
          </div>
          {audioConnected ? (
            <>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#22c55e' }}>Connected</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: theme.text }}>12 : 32</p>
            </>
          ) : (
            <p style={{ fontSize: '20px', fontWeight: 700, color: theme.text }}>Connecting...</p>
          )}
          <button onClick={() => { setShowAudio(false); setAudioConnected(false); setActiveCall(null) }} style={{ background: theme.bgCard, border: '1.5px solid #ef4444', color: '#ef4444', borderRadius: '10px', padding: '10px 32px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
            Hang Up
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Mobile: show either list or chat */}
      {isMobile ? (
        mobileView === 'list' ? <CallListPanel /> : <ChatWindowPanel />
      ) : (
        /* Desktop: show both */
        <>
          <CallListPanel />
          <ChatWindowPanel />
        </>
      )}

      {/* Start New Conversation Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: theme.bgCard, borderRadius: '20px', padding: '24px', width: isMobile ? '92%' : '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: theme.bgInput, borderRadius: '14px', padding: '11px 16px' }}>
                <Search size={16} color={theme.textSecondary} />
                <input type="text" placeholder="Search" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: theme.text }} />
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: '#6b7280', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <X size={16} color="white" />
              </button>
            </div>
            {calls.map((c, i) => (
              <div key={c.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 4px' }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', color: theme.text }}>{c.name}</p>
                    <p style={{ fontSize: '12.5px', color: theme.textSecondary }}>{c.time}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div onClick={() => { handleAudioCall(c); setShowModal(false) }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Phone size={18} color="#22c55e" />
                    </div>
                    <div onClick={() => { handleVideoCall(c); setShowModal(false) }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Video size={18} color="#22c55e" />
                    </div>
                  </div>
                </div>
                {i < calls.length - 1 && <div style={{ height: '1px', background: theme.borderLight }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CallLog