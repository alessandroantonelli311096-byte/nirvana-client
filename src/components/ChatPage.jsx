import { useState, useEffect, useRef } from 'react'
import { Icon } from './Icons'
import logo from '../assets/logo.png'

const formatTime = (d) => new Date(d).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
const formatDate = (d) => new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })

export default function ChatPage({ messages, onSend, userId }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={logo} alt="Nirvana" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Nirvana Senigallia</div>
          <div style={{ fontSize: 11, color: '#4ade80' }}>Online</div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => {
          const isMe = m.from_id === userId
          const showDate = i === 0 || formatDate(m.created_at) !== formatDate(messages[i-1].created_at)
          return (
            <div key={m.id || i}>
              {showDate && (
                <div className="chat-date">
                  {new Date(m.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                </div>
              )}
              <div className={`chat-bubble-wrap ${isMe ? 'me' : 'them'}`}>
                <div className={`chat-bubble ${isMe ? 'me' : 'them'}`}>
                  {m.text}
                  <div className="chat-time">{formatTime(m.created_at)}</div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-wrap">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Scrivi un messaggio..."
          className="chat-input"
          onFocus={e => e.target.classList.add('focused')}
          onBlur={e => e.target.classList.remove('focused')} />
        <button onClick={send} className={`send-btn ${input.trim() ? 'active' : ''}`}>
          <Icon name="send" size={18} color={input.trim() ? '#fff' : '#555'} />
        </button>
      </div>
    </div>
  )
}
