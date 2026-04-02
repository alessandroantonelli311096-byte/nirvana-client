import { useState } from 'react'
import { Icon } from './Icons'
import { getExForWeek } from '../hooks/useProgram'

const formatRiposo = (s) => {
  if (!s) return ''
  const n = parseInt(s)
  return n >= 60 ? `${Math.floor(n/60)}'${n%60 ? (n%60).toString().padStart(2,'0')+'"' : ''}` : `${n}"`
}

export default function SchedaPage({ program, onStartWorkout }) {
  const [expandedDay, setExpandedDay] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(program?.current_week || 1)
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [completedSets, setCompletedSets] = useState({})
  const totalWeeks = program?.settimane || 4

  if (!program) {
    return (
      <div className="page-content">
        <div className="page-title">La tua Scheda</div>
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>📋</div>
          <div style={{ fontWeight: 600, marginTop: 12 }}>Nessuna scheda disponibile</div>
        </div>
      </div>
    )
  }

  const toggleSet = (exIdx, setIdx) => {
    const key = `${exIdx}-${setIdx}`
    setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const hasProgression = (dayIdx, exIdx) => !!program.weekly_schedule?.[dayIdx]?.[exIdx]

  // Active workout mode
  if (activeWorkout !== null) {
    const day = program.days[activeWorkout]
    const allSets = day.exercises.reduce((sum, _, ei) => {
      const ex = getExForWeek(program, activeWorkout, ei, selectedWeek)
      return sum + parseInt(ex.serie || 3)
    }, 0)
    const doneSets = Object.values(completedSets).filter(Boolean).length

    return (
      <div>
        <div className="workout-header">
          <div className="workout-header-top">
            <button onClick={() => { setActiveWorkout(null); setCompletedSets({}) }} className="back-btn">
              <Icon name="back" size={22} color="#888" />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{day.label}</div>
              <div style={{ fontSize: 12, color: '#888' }}>Settimana {selectedWeek} · {day.exercises.length} esercizi</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FF1654' }}>{doneSets}/{allSets}</div>
          </div>
          <div className="progress-bar" style={{ height: 4 }}>
            <div className="progress-fill" style={{ width: `${allSets > 0 ? (doneSets/allSets)*100 : 0}%` }} />
          </div>
        </div>

        <div style={{ padding: '16px 20px 100px' }}>
          {day.exercises.map((_, ei) => {
            const ex = getExForWeek(program, activeWorkout, ei, selectedWeek)
            const sets = parseInt(ex.serie || 3)
            const changed = hasProgression(activeWorkout, ei)
            return (
              <div key={ei} className="exercise-card">
                <div className="exercise-top">
                  <div>
                    <div className="exercise-name">{ex.nome}</div>
                    <div className="exercise-meta">
                      <span>{ex.serie}×{ex.ripetizioni}</span>
                      {ex.peso && <span> · {ex.peso}kg</span>}
                      {ex.percentuale && <span style={{ color: '#B84A9E' }}> · {ex.percentuale}%</span>}
                      {ex.rpe && <span> · RPE {ex.rpe}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {ex.tecnica && <span className="tech-badge">{ex.tecnica}</span>}
                    {changed && <span className="week-badge">W{selectedWeek}</span>}
                  </div>
                </div>

                {ex.riposo && (
                  <div className="riposo-info">
                    <Icon name="clock" size={12} color="#555" /> Riposo: {formatRiposo(ex.riposo)}
                  </div>
                )}

                <div className="sets-grid">
                  {Array.from({ length: sets }).map((_, si) => {
                    const done = completedSets[`${ei}-${si}`]
                    return (
                      <button key={si} onClick={() => toggleSet(ei, si)}
                        className={`set-btn ${done ? 'done' : ''}`}>
                        {done ? '✓' : `S${si + 1}`}
                      </button>
                    )
                  })}
                </div>

                {ex.note && <div className="exercise-note">📝 {ex.note}</div>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Normal scheda view
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">La tua Scheda</div>
        <div className="page-subtitle">{program.nome}</div>
      </div>

      {/* Week selector */}
      <div className="week-selector">
        <div className="week-selector-label">
          <Icon name="calendar" size={14} color="#888" /> Settimana
        </div>
        <div className="week-buttons">
          {Array.from({ length: totalWeeks }).map((_, wi) => {
            const w = wi + 1
            const isCurrent = w === (program.current_week || 1)
            const isSelected = w === selectedWeek
            return (
              <button key={w} onClick={() => setSelectedWeek(w)}
                className={`week-btn ${isSelected ? 'selected' : ''} ${isCurrent && !isSelected ? 'current' : ''}`}>
                {w}
                {isCurrent && !isSelected && <div className="current-dot" />}
              </button>
            )
          })}
        </div>
        {selectedWeek === (program.current_week || 1) && (
          <div style={{ fontSize: 11, color: '#FF1654', marginTop: 8, fontWeight: 600 }}>← Settimana corrente</div>
        )}
      </div>

      {program.note_generali && (
        <div className="note-box">
          <span style={{ fontWeight: 700, color: '#B84A9E' }}>Note: </span>{program.note_generali}
        </div>
      )}

      {/* Day cards */}
      {program.days.map((day, di) => (
        <div key={di} className={`day-card ${expandedDay === di ? 'expanded' : ''}`}>
          <button onClick={() => setExpandedDay(expandedDay === di ? null : di)} className="day-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className={`day-number ${di % 2 === 0 ? 'pink' : 'purple'}`}>{di + 1}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{day.label}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{day.exercises.length} esercizi</div>
              </div>
            </div>
            <div style={{ transform: expandedDay === di ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
              <Icon name="chevron" size={18} color="#555" />
            </div>
          </button>

          {expandedDay === di && (
            <div className="day-content">
              <button onClick={() => setActiveWorkout(di)} className="start-workout-btn">
                <Icon name="play" size={16} color="#fff" />
                Inizia — Settimana {selectedWeek}
              </button>

              {day.exercises.map((_, ei) => {
                const ex = getExForWeek(program, di, ei, selectedWeek)
                const changed = hasProgression(di, ei)
                const weekData = program.weekly_schedule?.[di]?.[ei]?.[selectedWeek]
                return (
                  <div key={ei} className="exercise-row">
                    <div className="exercise-num">{ei + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="exercise-name-row">
                        {ex.nome}
                        {changed && <span style={{ fontSize: 9, color: '#B84A9E' }}>●</span>}
                      </div>
                      <div className="exercise-detail">
                        <span style={{ color: weekData?.serie || weekData?.ripetizioni ? '#FF1654' : '#888' }}>
                          {ex.serie}×{ex.ripetizioni}
                        </span>
                        {ex.peso && <span style={{ color: weekData?.peso ? '#FF1654' : '#888' }}> · {ex.peso}kg</span>}
                        {ex.percentuale && <span style={{ color: weekData?.percentuale ? '#B84A9E' : '#666' }}> · {ex.percentuale}%</span>}
                        {ex.rpe && <span> · RPE {ex.rpe}</span>}
                        {ex.riposo && <span> · {formatRiposo(ex.riposo)}</span>}
                      </div>
                      {weekData?.note && <div className="week-note">{weekData.note}</div>}
                    </div>
                    {ex.tecnica && <span className="tech-badge small">{ex.tecnica}</span>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
