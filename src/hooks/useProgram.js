import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProgram(clientId) {
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) return

    async function fetchProgram() {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .eq('client_id', clientId)
        .eq('active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

      setProgram(data)
      setLoading(false)
    }

    fetchProgram()

    // Ascolta aggiornamenti in tempo reale
    const channel = supabase
      .channel('program-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'programs',
        filter: `client_id=eq.${clientId}`
      }, () => {
        fetchProgram()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [clientId])

  return { program, loading }
}

// Helper: ottieni i dati di un esercizio per una settimana specifica
export function getExForWeek(program, dayIdx, exIdx, week) {
  if (!program) return null
  const baseEx = program.days[dayIdx]?.exercises[exIdx]
  if (!baseEx) return null
  const override = program.weekly_schedule?.[dayIdx]?.[exIdx]?.[week]
  if (!override) return baseEx
  return {
    ...baseEx,
    ...Object.fromEntries(
      Object.entries(override).filter(([_, v]) => v !== '' && v !== undefined)
    )
  }
}
