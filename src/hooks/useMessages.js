import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMessages(userId) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`from_id.eq.${userId},to_id.eq.${userId}`)
        .order('created_at', { ascending: true })
        .limit(100)

      setMessages(data || [])
      setLoading(false)
    }

    fetchMessages()

    // Real-time: ascolta nuovi messaggi
    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `to_id=eq.${userId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId])

  async function sendMessage(toId, text) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        from_id: userId,
        to_id: toId,
        text
      })
      .select()
      .single()

    if (data) setMessages(prev => [...prev, data])
    return { data, error }
  }

  async function markAsRead(messageIds) {
    await supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIds)

    setMessages(prev =>
      prev.map(m => messageIds.includes(m.id) ? { ...m, read: true } : m)
    )
  }

  const unreadCount = messages.filter(m => m.to_id === userId && !m.read).length

  return { messages, loading, sendMessage, markAsRead, unreadCount }
}
