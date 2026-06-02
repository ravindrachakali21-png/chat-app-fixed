import { useState } from 'react'
import { ArrowLeft, Download, Link, Star, Bell, Trash2, Flag, ChevronRight, Video, Phone, X, Plus } from 'lucide-react'
import { useIsMobile } from '../hooks/useWindowSize'
import myProfile from '../assets/my-profile.jpg'
import car1 from '../assets/car1.jpg'
import car2 from '../assets/car2.jpg'
import car3 from '../assets/car3.jpg'
import camelGang from '../assets/camels-gang.jpg'
import media1 from '../assets/media1.jpg'
import media2 from '../assets/media2.jpg'
import media3 from '../assets/media3.jpg'
import media4 from '../assets/media4.jpg'
import media5 from '../assets/media5.jpg'
import media6 from '../assets/media6.jpg'
import media7 from '../assets/media7.jpg'
import media8 from '../assets/media8.jpg'
import media9 from '../assets/media9.jpg'
import media10 from '../assets/media10.jpg'
import media11 from '../assets/media11.jpg'
import media12 from '../assets/media12.jpg'

const mediaImages = [
  [media1, media2, media3],
  [media4, media5, media6],
  [media7, media8, media9],
  [media10, media11, media12],
]

const PanelWrapper = ({ children, onClose }) => {
  const isMobile = useIsMobile()
  return (
    <div style={{
      width: isMobile ? '100%' : '300px',
      minWidth: isMobile ? 'unset' : '300px',
      height: '100%',
      background: '#fff',
      borderLeft: isMobile ? 'none' : '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      position: isMobile ? 'fixed' : 'relative',
      inset: isMobile ? '0' : 'auto',
      zIndex: isMobile ? 50 : 'auto',
    }}>
      {children}
    </div>
  )
}

// ─── Starred Messages Panel ───────────────────────────────────────────────────
const StarredPanel = ({ onClose }) => (
  <PanelWrapper onClose={onClose}>
    <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
      <ArrowLeft size={20} color="#111827" style={{ cursor: 'pointer' }} onClick={onClose} />
      <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Starred Messages</span>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', scrollbarWidth: 'none' }}>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>27th Oct 22</p>
      <div style={{ display: 'flex', marginBottom: '12px' }}>
        <div style={{ background: '#F8F9FE', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', maxWidth: '240px' }}>
          <p style={{ fontSize: '14px', color: '#111827' }}>Hi 👋, How are ya ?</p>
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px', textAlign: 'right' }}>0:12</p>
        </div>
      </div>
      {['Hi 👋 Panda, not bad, u ?', 'Can you send it as file ?'].map((msg, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <div style={{ background: '#2563eb', borderRadius: '18px 18px 4px 18px', padding: '12px 16px', maxWidth: '240px' }}>
            <p style={{ fontSize: '14px', color: 'white' }}>{msg}</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '4px', textAlign: 'right' }}>{i === 0 ? '8:17' : '11:12'}</p>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '8px' }}>
        <div style={{ background: '#F8F9FE', borderRadius: '16px', padding: '12px 16px', display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: '18px' }}>🖼️</span>
          <span style={{ fontSize: '13px', color: '#111827', fontWeight: 500 }}>Abstract.png</span>
          <Download size={16} color="#9ca3af" />
        </div>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>11:25</p>
      </div>
    </div>
  </PanelWrapper>
)

// ─── Media / Links / Docs Panel ───────────────────────────────────────────────
const MediaPanel = ({ onClose }) => {
  const [tab, setTab] = useState('Media')
  return (
    <PanelWrapper onClose={onClose}>
      <div style={{ padding: '20px 20px 0', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
        <ArrowLeft size={20} color="#111827" style={{ cursor: 'pointer', marginBottom: '16px' }} onClick={onClose} />
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Media', 'Links', 'Docs'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: tab === t ? '#2563eb' : '#6b7280', paddingBottom: '12px', borderBottom: tab === t ? '2px solid #2563eb' : '2px solid transparent' }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', scrollbarWidth: 'none' }}>
        {tab === 'Media' && mediaImages.map((row, ri) => (
          <div key={ri}>
            {(ri === 0 || ri === 3) && <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px', marginTop: ri === 3 ? '16px' : '0' }}>{ri === 0 ? '27th Oct 22' : '24th Oct 22'}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', marginBottom: '4px' }}>
              {row.map((img, ci) => (
                <div key={ci} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '6px' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
        {tab === 'Links' && (
          <>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>27th Oct 22</p>
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8F9FE', borderRadius: '12px', marginBottom: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Link size={18} color="#6b7280" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', color: '#111827', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://codingmonk.in/blogs</p>
                  <p style={{ fontSize: '12px', color: '#2563eb' }}>codingmonk.in</p>
                </div>
              </div>
            ))}
          </>
        )}
        {tab === 'Docs' && (
          <>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>27th Oct 22</p>
            {[{ name: 'Booked Ticket', icon: '📄', color: '#ef4444' }, { name: 'Invoice 22 Oct', icon: '🖼️', color: '#3b82f6' }, { name: 'Sales Report', icon: '📊', color: '#22c55e' }].map((doc, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ width: '100%', height: '120px', background: '#e5e7eb', borderRadius: '12px', marginBottom: '8px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', background: doc.color + '20', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '16px' }}>{doc.icon}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827', flex: 1 }}>{doc.name}</span>
                  <Download size={16} color="#9ca3af" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </PanelWrapper>
  )
}

// ─── Contact Info Panel ───────────────────────────────────────────────────────
const ContactPanel = ({ onClose, onMediaClick, onStarredClick }) => (
  <PanelWrapper onClose={onClose}>
    <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClose}>
          <X size={12} color="#6b7280" />
        </div>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Contact info</span>
      </div>

      <div style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <img src={myProfile} alt="Contact" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>Shreyansh shah</p>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>+91 6265 081 928</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {[{ icon: Video, label: 'Audio' }, { icon: Phone, label: 'Voice' }].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Icon size={22} color="#374151" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>About</p>
        <p style={{ fontSize: '14px', color: '#111827' }}>Hi there, I am using</p>
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={onMediaClick}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>Media, links and docs</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>201</span>
            <ChevronRight size={16} color="#6b7280" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
          {[car1, car2, car3].map((img, i) => (
            <div key={i} style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div onClick={onStarredClick} style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Star size={18} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontSize: '14px', color: '#111827' }}>Starred Messages</span>
        </div>
        <ChevronRight size={16} color="#6b7280" />
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={18} color="#374151" />
          <span style={{ fontSize: '14px', color: '#111827' }}>Mute Notifications</span>
        </div>
        <div style={{ width: '46px', height: '26px', background: '#2563eb', borderRadius: '999px', position: 'relative', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', right: '3px', top: '3px', width: '20px', height: '20px', background: 'white', borderRadius: '50%' }} />
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>1 group in common</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={camelGang} alt="Camel's Gang" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>Camel's Gang</p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>Owl, Parrot, Rabbit, You</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', gap: '12px' }}>
        <button style={{ flex: 1, padding: '10px', border: '1.5px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Flag size={15} color="#374151" /> Block
        </button>
        <button style={{ flex: 1, padding: '10px', border: '1.5px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Trash2 size={15} color="#374151" /> Delete
        </button>
      </div>
    </div>
  </PanelWrapper>
)

export { StarredPanel, MediaPanel, ContactPanel }