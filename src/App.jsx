import { Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { useIsMobile } from './hooks/useWindowSize'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import ChatList from './components/ChatList'
import EmptyState from './components/EmptyState'
import Profile from './components/Profile'
import Groups from './components/Groups'
import CallLog from './components/CallLog'
import Dashboard from './components/Dashboard'
import Updates from './components/Updates'
import Archive from './components/Archive'
import Settings from './components/Settings'

const ChatHome = () => (
  <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
    <ChatList />
    <EmptyState />
  </div>
)

function App() {
  const theme = useTheme()
  const isMobile = useIsMobile()

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      height: '100dvh',
      background: theme.bg,
      overflow: 'hidden',
      transition: 'background 0.3s',
      flexDirection: 'row',
    }}>
      {!isMobile && <Sidebar />}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
        position: 'relative',
      }}>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          <Routes>
            <Route path="/" element={isMobile ? <ChatList /> : <ChatHome />} />
            <Route path="/chat/:id" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/calls" element={<CallLog />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {isMobile && <MobileNav />}
      </div>
    </div>
  )
}

export default App
