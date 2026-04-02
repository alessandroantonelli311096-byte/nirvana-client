import { Icon } from './Icons'
import logo from '../assets/logo.png'

const formatDate = (d) => new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })

export default function HomePage({ profile, program, logs, onNavigate }) {
  if (!program) {
    return (
      <div className="page-content">
        <div className="greeting">
          <div>
            <div className="greeting-sub">Ciao,</div>
            <div className="greeting-name">{profile?.nome} 👊</div>
          </div>
          <img src={logo} alt="Nirvana" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain' }} />
        </div>
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>🏋️</div>
          <div style={{ fontWeight: 600, marginTop: 12 }}>Nessun programma attivo</div>
          <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>Il tuo trainer sta preparando la scheda</div>
        </div>
      </div>
    )
  }

  const completedCount = logs.filter(w => w.completed).length
  const totalSessions = (program.giorni || 4) * (program.settimane || 4)
  const weekProgress = Math.min(100, Math.round((completedCount / totalSessions) * 100))

  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="greeting-sub">Ciao,</div>
          <div className="greeting-name">{profile?.nome} 👊</div>
        </div>
        <img src={logo} alt="Nirvana" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain' }} />
      </div>

      {/* Week indicator */}
      <div className="week-indicator">
        <Icon name="calendar" size={18} color="#FF1654" />
        <span><strong style={{ color: '#FF1654' }}>Settimana {program.current_week || 1}</strong> di {program.settimane}</span>
      </div>

      {/* Program card */}
      <div className="program-card">
        <div className="program-card-top">
          <div>
            <div className="program-label">Programma Attivo</div>
            <div className="program-name">{program.nome}</div>
            <div className="program-meta">{program.settimane} settimane · {program.giorni}x/sett</div>
          </div>
          <span className="tag-obiettivo">{program.obiettivo}</span>
        </div>
        <div className="progress-section">
          <div className="progress-header">
            <span>Progresso</span>
            <span className="progress-pct">{weekProgress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${weekProgress}%` }} />
          </div>
          <div className="progress-count">{completedCount}/{totalSessions} allenamenti completati</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-actions">
        <button className="action-card" onClick={() => onNavigate('scheda')}>
          <Icon name="dumbbell" size={24} color="#FF1654" />
          <div className="action-label">La mia Scheda</div>
          <div className="action-sub">{program.days?.length || 0} giorni</div>
        </button>
        <button className="action-card" onClick={() => onNavigate('log')}>
          <Icon name="chart" size={24} color="#B84A9E" />
          <div className="action-label">Log Workout</div>
          <div className="action-sub">{logs.length} sessioni</div>
        </button>
      </div>

      {/* Last workouts */}
      {logs.length > 0 && (
        <div className="section">
          <div className="section-label">Ultimi Allenamenti</div>
          {logs.slice(0, 3).map((w, i) => (
            <div key={w.id || i} className="workout-row">
              <div className={`workout-icon ${w.completed ? 'done' : 'live'}`}>
                <Icon name={w.completed ? 'check' : 'clock'} size={18} color={w.completed ? '#4ade80' : '#FF1654'} />
              </div>
              <div className="workout-info">
                <div className="workout-label">{w.day_label}</div>
                <div className="workout-date">{formatDate(w.date)} · Sett. {w.week}</div>
              </div>
              <span className={`workout-status ${w.completed ? 'done' : 'live'}`}>
                {w.completed ? 'Completato' : 'In corso'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
