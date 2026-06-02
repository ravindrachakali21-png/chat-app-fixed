import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, X, ChevronRight, Link, Smile, Send } from 'lucide-react'
import { useIsMobile } from '../hooks/useWindowSize'
import pinkPanda from '../assets/pink-panda.jpg'
import dogHat from '../assets/dog-hat.jpg'
import cuteTurtle from '../assets/cute-turtle.jpg'
import coolSpirit from '../assets/cool-spirit.jpg'
import statusUpdate from '../assets/status-update.jpg'
import story1 from '../assets/story1.jpg'
import story2 from '../assets/story2.jpg'
import story3 from '../assets/story3.jpg'

const updates = {
  notSeen: [
    { id: 1, name: 'Pink Panda (Me)', time: '20hr', avatar: pinkPanda, isMe: true },
    { id: 2, name: 'Dog Hat', time: '3 min', avatar: dogHat },
  ],
  seen: [
    { id: 3, name: 'Cute Turtle', time: '50 min', avatar: cuteTurtle },
    { id: 4, name: 'Cool spirit', time: '23 hr', avatar: coolSpirit },
  ]
}

const Updates = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)

  const handleSelect = (u) => setSelected(u)
  const handleClose = () => setSelected(null)

  const LeftPanel = () => (
    <div style={{
      width: isMobile ? '100%' : '360px',
      minWidth: isMobile ? 'unset' : '360px',
      height: '100%',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      borderRight: isMobile ? 'none' : '1px solid #e5e7eb'
    }}>
      <div style={{ padding: '28px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft size={22} color="#111827" />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Updates</h1>
        </div>
        <Plus size={22} color="#111827" style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '12px' }}>Not seen</p>
        {updates.notSeen.map(u => (
          <div key={u.id} onClick={() => handleSelect(u)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', borderRadius: '16px', cursor: 'pointer', marginBottom: '6px', background: selected?.id === u.id && !isMobile ? '#2563eb' : 'transparent' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', padding: '2px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', flexShrink: 0 }}>
              <img src={u.avatar} alt={u.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: selected?.id === u.id && !isMobile ? 'white' : '#111827' }}>{u.name}</p>
              {u.isMe && <p style={{ fontSize: '12px', color: selected?.id === u.id && !isMobile ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>Edit</p>}
            </div>
            <span style={{ fontSize: '12px', color: selected?.id === u.id && !isMobile ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>{u.time}</span>
          </div>
        ))}

        <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '12px', marginTop: '16px' }}>Seen</p>
        {updates.seen.map(u => (
          <div key={u.id} onClick={() => handleSelect(u)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', borderRadius: '16px', cursor: 'pointer', marginBottom: '6px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', padding: '2px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', opacity: 0.5, flexShrink: 0 }}>
              <img src={u.avatar} alt={u.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827' }}>{u.name}</p>
            </div>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>{u.time}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const StoryViewer = () => (
    <div style={{
      flex: isMobile ? 'unset' : 1,
      width: isMobile ? '100%' : 'auto',
      height: '100%',
      background: '#F8F9FE',
      display: 'flex',
      flexDirection: 'column',
      position: isMobile ? 'fixed' : 'relative',
      inset: isMobile ? '0' : 'auto',
      zIndex: isMobile ? 40 : 'auto'
    }}>
      <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '15px', color: '#111827' }}>{selected?.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {selected?.isMe && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" style={{ cursor: 'pointer' }}>
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
          )}
          <X size={20} color="#111827" style={{ cursor: 'pointer' }} onClick={handleClose} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', left: '24px', right: '24px', display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} style={{ flex: 1, height: '3px', borderRadius: '4px', background: i === 0 ? '#2563eb' : '#d1d5db' }} />
          ))}
        </div>
        {!isMobile && (
          <div style={{ position: 'absolute', left: '16px', width: '32px', height: '32px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ChevronLeft size={18} color="#111827" />
          </div>
        )}
        <div style={{ width: isMobile ? '100%' : '340px', maxWidth: '340px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <img src={statusUpdate} alt="Status" style={{ width: '100%', height: isMobile ? '60vw' : '580px', objectFit: 'cover', display: 'block' }} />
        </div>
        {!isMobile && (
          <div style={{ position: 'absolute', right: '16px', width: '32px', height: '32px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ChevronRight size={18} color="#111827" />
          </div>
        )}
      </div>

      {selected?.isMe ? (
        <div style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '16px 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <div style={{ width: '64px', height: '64px', border: '2px solid #2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
              <Plus size={24} color="#2563eb" />
            </div>
            {[story1, story2, story3].map((img, i) => (
              <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                <button style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', background: '#ef4444', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                  <X size={10} color="white" />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={20} color="white" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', padding: '14px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <Link size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />
          <input type="text" placeholder="Write a message ..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', background: 'transparent' }} />
          <Smile size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />
          <div style={{ width: '38px', height: '38px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Send size={18} color="white" />
          </div>
        </div>
      )}
    </div>
  )

  const EmptyRight = () => (
    <div style={{ flex: 1, height: '100%', background: '#F8F9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="12" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4.5 3" strokeLinecap="round"/>
      </svg>
      <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>Click on an update to view</p>
    </div>
  )

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
      {isMobile ? (
        selected ? <StoryViewer /> : <LeftPanel />
      ) : (
        <>
          <LeftPanel />
          {selected ? <StoryViewer /> : <EmptyRight />}
        </>
      )}
    </div>
  )
}

export default Updates