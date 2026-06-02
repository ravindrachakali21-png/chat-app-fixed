import { useState } from 'react'
import { Search, Plus, X, Download, Smile, Send, Link, ChevronDown, ArrowLeft } from 'lucide-react'
import { useIsMobile } from '../hooks/useWindowSize'
import pinkPanda from '../assets/pink-panda.jpg'
import dogHat from '../assets/dog-hat.jpg'
import cuteTurtle from '../assets/cute-turtle.jpg'
import coolSpirit from '../assets/cool-spirit.jpg'
import strangeCat from '../assets/strange-cat.jpg'
import animalKingdom from '../assets/animal-kingdom.jpg'
import abstractImg from '../assets/abstract-img.jpg'

const initialGroups = [
  { id: 1, name: 'Animal Kingdom', message: 'You: thnx!', time: '9:36', avatar: animalKingdom, online: true, pinned: true },
  { id: 2, name: 'Dog Hat', message: "It's so quite outside 🤨", time: '9:36', avatar: dogHat, badge: 2, online: true },
  { id: 3, name: 'Cute Turtle', message: "That's It. Goodbye!", time: '9:36', avatar: cuteTurtle, badge: 3, online: true },
  { id: 4, name: 'Cool spirit', message: 'Look what I found', time: '9:36', avatar: coolSpirit, online: true },
  { id: 5, name: 'strange cat', message: 'You: Hi, sorry to bother you...', time: '9:36', avatar: strangeCat, online: true, chevron: true },
]

const allContacts = [
  { id: 1, name: 'Pink Panda', avatar: pinkPanda },
  { id: 2, name: 'Dog Hat', avatar: dogHat },
  { id: 3, name: 'Cute Turtle', avatar: cuteTurtle },
  { id: 4, name: 'Cool spirit', avatar: coolSpirit },
  { id: 5, name: 'strange cat', avatar: strangeCat },
]

const Groups = () => {
  const isMobile = useIsMobile()
  const [groups, setGroups] = useState(initialGroups)
  const [showModal, setShowModal] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [memberSearch, setMemberSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState(initialGroups[0])
  const [message, setMessage] = useState('')
  const [mobileView, setMobileView] = useState('list')
  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 1, text: 'Hi 👋, How are ya ?', time: '0:12', mine: false },
      { id: 2, text: 'Hi 👋 Panda, not bad, u ?', time: '8:17', mine: true },
      { id: 3, text: 'Can you send me an abstract image?', time: '8:17', mine: true },
      { id: 4, type: 'image', time: '10:35', mine: false },
      { id: 5, type: 'reaction', text: '🔥 1', mine: false },
      { id: 6, text: 'Can you send it as file ?', time: '11:12', mine: true },
      { id: 7, type: 'file', name: 'Abstract.png', time: '11:25', mine: false },
      { id: 8, text: 'Thnx!', time: '11:28', mine: true },
    ]
  })

  const filteredContacts = allContacts.filter(c =>
    c.name.toLowerCase().includes(memberSearch.toLowerCase()) &&
    !selectedMembers.find(m => m.id === c.id)
  )

  const addMember = (contact) => { setSelectedMembers(prev => [...prev, contact]); setMemberSearch('') }
  const removeMember = (id) => setSelectedMembers(prev => prev.filter(m => m.id !== id))

  const handleCreate = () => {
    if (!groupName.trim()) return
    const newGroup = {
      id: Date.now(), name: groupName.trim(), message: 'Group created',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: selectedMembers[0]?.avatar || pinkPanda, online: true, pinned: false,
    }
    setGroups(prev => [...prev, newGroup])
    setChatMessages(prev => ({ ...prev, [newGroup.id]: [{ id: 1, text: `Group "${newGroup.name}" created! 🎉`, time: newGroup.time, mine: false }] }))
    setActiveGroup(newGroup)
    setGroupName(''); setSelectedMembers([]); setMemberSearch(''); setShowModal(false)
    if (isMobile) setMobileView('chat')
  }

  const sendMessage = () => {
    if (!message.trim() || !activeGroup) return
    const newMsg = { id: Date.now(), text: message.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true }
    setChatMessages(prev => ({ ...prev, [activeGroup.id]: [...(prev[activeGroup.id] || []), newMsg] }))
    setMessage('')
  }

  const handleGroupSelect = (g) => {
    setActiveGroup(g)
    if (isMobile) setMobileView('chat')
  }

  const currentMessages = chatMessages[activeGroup?.id] || []

  const GroupListPanel = () => (
    <div style={{ width: isMobile ? '100%' : '360px', minWidth: isMobile ? 'unset' : '360px', height: '100%', background: '#F4F6FB', display: 'flex', flexDirection: 'column', borderRight: isMobile ? 'none' : '1px solid #e5e7eb' }}>

      <div style={{ background: '#fff', padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827' }}>Groups</h1>
      </div>

      <div style={{ background: '#fff', padding: '0 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F4F6FB', borderRadius: '14px', padding: '11px 16px' }}>
          <Search size={16} color="#9ca3af" />
          <input type="text" placeholder="Search" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px' }} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '0 20px 16px', borderBottom: '1px solid #f3f4f6' }}>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: '14px', fontWeight: 600 }}>
          Create New Group <Plus size={18} color="#2563eb" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', scrollbarWidth: 'none' }}>
        {groups.filter(g => g.pinned).length > 0 && (
          <>
            <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#6b7280', padding: '4px 6px 10px' }}>Pinned</p>
            {groups.filter(g => g.pinned).map(g => (
              <div key={g.id} onClick={() => handleGroupSelect(g)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: activeGroup?.id === g.id && !isMobile ? '#2563eb' : '#fff', borderRadius: '16px', cursor: 'pointer', marginBottom: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={g.avatar} alt={g.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  {g.online && <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', background: '#22c55e', border: '2px solid white', borderRadius: '50%' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14.5px', color: activeGroup?.id === g.id && !isMobile ? 'white' : '#111827' }}>{g.name}</span>
                    <span style={{ fontSize: '12px', color: activeGroup?.id === g.id && !isMobile ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>{g.time}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: activeGroup?.id === g.id && !isMobile ? 'rgba(255,255,255,0.75)' : '#9ca3af' }}>{g.message}</span>
                </div>
              </div>
            ))}
          </>
        )}

        <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#6b7280', padding: '14px 6px 10px' }}>All Chats</p>
        {groups.filter(g => !g.pinned).map(g => (
          <div key={g.id} onClick={() => handleGroupSelect(g)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: activeGroup?.id === g.id && !isMobile ? '#2563eb' : '#fff', borderRadius: '16px', cursor: 'pointer', marginBottom: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={g.avatar} alt={g.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              {g.online && <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', background: '#22c55e', border: '2px solid white', borderRadius: '50%' }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontWeight: 600, fontSize: '14.5px', color: activeGroup?.id === g.id && !isMobile ? 'white' : '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</span>
                <span style={{ fontSize: '12px', color: activeGroup?.id === g.id && !isMobile ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>{g.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: activeGroup?.id === g.id && !isMobile ? 'rgba(255,255,255,0.75)' : '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.message}</span>
                {g.badge && <span style={{ width: '20px', height: '20px', background: activeGroup?.id === g.id && !isMobile ? 'white' : '#2563eb', color: activeGroup?.id === g.id && !isMobile ? '#2563eb' : 'white', fontSize: '11px', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{g.badge}</span>}
                {g.chevron && <ChevronDown size={14} color="#9ca3af" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const ChatWindowPanel = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FE' }}>
      <div style={{ background: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isMobile && (
            <button onClick={() => setMobileView('list')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} color="#111827" />
            </button>
          )}
          <div style={{ position: 'relative' }}>
            <img src={activeGroup?.avatar} alt={activeGroup?.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', background: '#22c55e', border: '2px solid white', borderRadius: '50%' }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '15px', color: '#111827' }}>{activeGroup?.name}</p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>Pink Panda, Turtle, 212 others</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Search size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />
          {!isMobile && <ChevronDown size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '12px' : '20px', scrollbarWidth: 'none' }}>
        {currentMessages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'image' ? (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ background: '#fff', borderRadius: '18px', padding: '8px', display: 'inline-block', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <img src={abstractImg} alt="Abstract" style={{ width: isMobile ? '150px' : '180px', height: isMobile ? '120px' : '150px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px', textAlign: 'right' }}>{msg.time}</p>
                </div>
              </div>
            ) : msg.type === 'reaction' ? (
              <div style={{ marginBottom: '8px' }}><span style={{ fontSize: '13px' }}>{msg.text}</span></div>
            ) : msg.type === 'file' ? (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '12px 16px', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <span style={{ fontSize: '18px' }}>🖼️</span>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{msg.name}</span>
                  <Download size={18} color="#9ca3af" style={{ cursor: 'pointer' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{msg.time}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: msg.mine ? 'flex-end' : 'flex-start', marginBottom: '6px' }}>
                <div style={{ background: msg.mine ? '#2563eb' : '#fff', borderRadius: msg.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', maxWidth: '70%', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <p style={{ fontSize: '14px', color: msg.mine ? 'white' : '#111827' }}>{msg.text}</p>
                  <p style={{ fontSize: '11px', color: msg.mine ? 'rgba(255,255,255,0.65)' : '#9ca3af', marginTop: '4px', textAlign: 'right' }}>{msg.time}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {activeGroup?.id === 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0 16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Today</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>
        )}
      </div>

      <div style={{ background: '#fff', padding: '12px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <Link size={20} color="#9ca3af" style={{ cursor: 'pointer', flexShrink: 0 }} />
        <input type="text" placeholder="Write a message ..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#374151', background: 'transparent' }} />
        <Smile size={20} color="#9ca3af" style={{ cursor: 'pointer', flexShrink: 0 }} />
        <div onClick={sendMessage} style={{ width: '38px', height: '38px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <Send size={18} color="white" />
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>

      {isMobile ? (
        mobileView === 'list' ? <GroupListPanel /> : <ChatWindowPanel />
      ) : (
        <>
          <GroupListPanel />
          <ChatWindowPanel />
        </>
      )}

      {/* Create Group Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', width: isMobile ? '92%' : '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>Create New Group</h2>
              <button onClick={() => { setShowModal(false); setGroupName(''); setSelectedMembers([]); setMemberSearch('') }} style={{ background: '#6b7280', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} color="white" />
              </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <label style={{ position: 'absolute', top: '-9px', left: '12px', background: 'white', padding: '0 4px', fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>Name</label>
              <input placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #2563eb', borderRadius: '8px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>

            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <label style={{ position: 'absolute', top: '-9px', left: '12px', background: 'white', padding: '0 4px', fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Members</label>
              <div style={{ padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', minHeight: '52px' }}>
                {selectedMembers.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F4F6FB', borderRadius: '20px', padding: '4px 10px 4px 6px' }}>
                    <img src={m.avatar} alt={m.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '13px', color: '#374151' }}>{m.name}</span>
                    <X size={12} color="#9ca3af" style={{ cursor: 'pointer' }} onClick={() => removeMember(m.id)} />
                  </div>
                ))}
                <input placeholder="Search contacts..." value={memberSearch} onChange={e => setMemberSearch(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', minWidth: '120px', flex: 1 }} />
              </div>
            </div>

            {memberSearch && filteredContacts.length > 0 && (
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                {filteredContacts.map((c, i) => (
                  <div key={c.id} onClick={() => addMember(c)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', cursor: 'pointer', borderBottom: i < filteredContacts.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '14px', color: '#111827' }}>{c.name}</span>
                  </div>
                ))}
              </div>
            )}

            {!memberSearch && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Add members:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {allContacts.filter(c => !selectedMembers.find(m => m.id === c.id)).map(c => (
                    <div key={c.id} onClick={() => addMember(c)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F4F6FB', borderRadius: '20px', padding: '6px 12px 6px 6px', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
                      <img src={c.avatar} alt={c.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '13px', color: '#374151' }}>{c.name}</span>
                      <Plus size={13} color="#2563eb" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleCreate} disabled={!groupName.trim()} style={{ width: '100%', padding: '14px', background: groupName.trim() ? '#2563eb' : '#93c5fd', border: 'none', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: 600, cursor: groupName.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Groups