import { useState } from 'react'
import logo from '../assets/logo.png'

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !pass) { setError('Inserisci email e password'); return }
    setLoading(true)
    setError('')
    const { error: authError } = await onLogin(email, pass)
    if (authError) {
      setError('Email o password non corretti')
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-glow" />
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Nirvana" className="login-logo-img" />
        </div>

        <div className="login-card">
          <div className="form-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="nome@email.com"
              onFocus={e => e.target.classList.add('focused')}
              onBlur={e => e.target.classList.remove('focused')} />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              onFocus={e => e.target.classList.add('focused')}
              onBlur={e => e.target.classList.remove('focused')}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button onClick={handleLogin} disabled={loading} className="login-btn">
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </div>
        <p className="login-footer">Credenziali fornite dal tuo trainer</p>
      </div>
    </div>
  )
}
