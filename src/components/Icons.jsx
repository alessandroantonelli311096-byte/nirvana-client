export const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const paths = {
    home: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V13h6v8" fill="none" stroke={color} strokeWidth="1.8"/></>,
    dumbbell: <><path d="M6.5 6.5h11M4 9h2.5v6H4a1 1 0 01-1-1v-4a1 1 0 011-1zm16 0h-2.5v6H20a1 1 0 001-1v-4a1 1 0 00-1-1zM2 10.5v3M22 10.5v3M6.5 7.5v9M17.5 7.5v9" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"/></>,
    chart: <><path d="M3 3v18h18" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M7 14l4-4 3 3 5-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></>,
    check: <path d="M5 12l5 5L20 7" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>,
    play: <path d="M8 5v14l11-7L8 5z" fill={color}/>,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    clock: <><circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.8"/><path d="M12 7v5l3 3" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    chevron: <path d="M9 6l6 6-6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    back: <path d="M15 18l-6-6 6-6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M3 10h18M8 2v4M16 2v4" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    trending: <><path d="M3 17l6-6 4 4 8-8" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 7h4v4" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" fill="none" stroke={color} strokeWidth="1.8"/><path d="M16 17l5-5-5-5M21 12H9" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{paths[name]}</svg>
}
