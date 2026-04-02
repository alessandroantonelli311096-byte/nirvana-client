import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useProgram } from './hooks/useProgram'
import { useWorkoutLog } from './hooks/useWorkoutLog'
import { useMessages } from './hooks/useMessages'
import LoginScreen from './components/LoginScreen'
import BottomNav from './components/BottomNav'
import HomePage from './components/HomePage'
import SchedaPage from './components/SchedaPage'
import LogPage from './components/LogPage'
import ChatPage from './components/ChatPage'
import './App.css'

function App() {
  const { user, profile, loading, signIn, signOut } = useAuth()
  const { program } = useProgram(user?.id)
  const { logs, addLog, updateLog } = useWorkoutLog(user?.id)
  const { messages, sendMessage, unreadCount } = useMessages(user?.id)
  const [page, setPage] = useState('home')

  // Loading screen
  if (loading) {
    return (
      <div className="app-shell">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <div style={{ color: '#666', fontSize: 13, marginTop: 16 }}>Caricamento...</div>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="app-shell">
        <LoginScreen onLogin={signIn} />
      </div>
    )
  }

  // Trainer ID per i messaggi (prendi dal profilo o dal programma)
  const trainerId = profile?.trainer_id

  const handleSendMessage = (text) => {
    if (trainerId) sendMessage(trainerId, text)
  }

  return (
    <div className="app-shell">
      {page === 'home' && (
        <HomePage
          profile={profile}
          program={program}
          logs={logs}
          onNavigate={setPage}
        />
      )}
      {page === 'scheda' && (
        <SchedaPage program={program} />
      )}
      {page === 'log' && (
        <LogPage logs={logs} />
      )}
      {page === 'chat' && (
        <ChatPage
          messages={messages}
          onSend={handleSendMessage}
          userId={user.id}
        />
      )}
      <BottomNav active={page} onChange={setPage} unreadCount={unreadCount} />
    </div>
  )
}

export default App
