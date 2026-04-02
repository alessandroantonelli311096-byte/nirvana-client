import { Icon } from './Icons'

export default function BottomNav({ active, onChange, unreadCount }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'scheda', icon: 'dumbbell', label: 'Scheda' },
    { id: 'log', icon: 'chart', label: 'Log' },
    { id: 'chat', icon: 'chat', label: 'Messaggi' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map(it => (
        <button key={it.id} onClick={() => onChange(it.id)}
          className={`nav-btn ${active === it.id ? 'active' : ''}`}>
          <Icon name={it.icon} size={22} color={active === it.id ? '#FF1654' : '#555'} />
          <span>{it.label}</span>
          {it.id === 'chat' && unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
