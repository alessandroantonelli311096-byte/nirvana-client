import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useWorkoutLog(clientId) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) return

    async function fetchLogs() {
      const { data } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('client_id', clientId)
        .order('date', { ascending: false })
        .limit(50)

      setLogs(data || [])
      setLoading(false)
    }

    fetchLogs()
  }, [clientId])

  async function addLog(log) {
    const { data, error } = await supabase
      .from('workout_logs')
      .insert({ ...log, client_id: clientId })
      .select()
      .single()

    if (data) setLogs(prev => [data, ...prev])
    return { data, error }
  }

  async function updateLog(logId, updates) {
    const { data, error } = await supabase
      .from('workout_logs')
      .update(updates)
      .eq('id', logId)
      .select()
      .single()

    if (data) {
      setLogs(prev => prev.map(l => l.id === logId ? data : l))
    }
    return { data, error }
  }

  return { logs, loading, addLog, updateLog }
}
