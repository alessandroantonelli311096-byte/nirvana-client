import { Icon } from './Icons'

export default function LogPage({ logs }) {
  const completedCount = logs.filter(w => w.completed).length
  const thisWeek = logs.filter(w => {
    const d = new Date(w.date)
    return d >= new Date(Date.now() - 7 * 86400000)
  }).length

  return (
    <div className="page-content">
      <div className="page-title">Storico Allenamenti</div>

      <div className="stats-grid">
        {[
          { label: 'Completati', value: completedCount, color: '#4ade80' },
          { label: 'Settimana', value: thisWeek, color: '#FF1654' },
          { label: 'Streak', value: '🔥', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>📊</div>
          <div style={{ fontWeight: 600, marginTop: 12 }}>Nessun allenamento registrato</div>
          <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>Inizia il tuo primo workout dalla Scheda</div>
        </div>
      ) : (
        logs.map((w, i) => (
          <div key={w.id || i} className="log-card">
            <div className={`log-icon ${w.completed ? 'done' : 'live'}`}>
              <Icon name={w.completed ? 'check' : 'clock'} size={22} color={w.completed ? '#4ade80' : '#FF1654'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{w.day_label}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                {new Date(w.date).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}
                {w.week && ` · Sett. ${w.week}`}
              </div>
            </div>
            <div className={`log-status ${w.completed ? 'done' : 'live'}`}>
              {w.completed ? 'Done' : 'Live'}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
