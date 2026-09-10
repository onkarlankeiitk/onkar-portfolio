'use client'

/**
 * PasswordGate
 *
 * Watches scroll position. Once the user has scrolled 30% past the hero
 * section (i.e. > 130vh from the top), it locks the page and shows a
 * full-screen password prompt.
 *
 * Password is read from NEXT_PUBLIC_CASE_STUDY_PASSWORD (env var).
 * Unlock state is persisted in sessionStorage so the gate doesn't refire
 * on refresh within the same tab session.
 *
 * Usage: drop <PasswordGate accentColor="#…" /> anywhere inside the page
 * (before or after other content — it renders a fixed overlay).
 */

import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'cs_unlocked'
const PASSWORD    = process.env.NEXT_PUBLIC_CASE_STUDY_PASSWORD ?? ''

// How many viewport-heights past the hero before gate fires
const TRIGGER_VH = 1.3   // 1.0 = end of hero, 1.3 = 30% past hero

interface Props {
  accentColor?: string   // colour for button + focus ring
}

export default function PasswordGate({ accentColor = '#F97316' }: Props) {
  const [show,    setShow]    = useState(false)
  const [value,   setValue]   = useState('')
  const [error,   setError]   = useState(false)
  const [shake,   setShake]   = useState(false)
  const inputRef              = useRef<HTMLInputElement>(null)
  const triggered             = useRef(false)

  // ── Check sessionStorage on mount ──────────────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      triggered.current = true   // already unlocked — never fire
    }
  }, [])

  // ── Scroll watcher ─────────────────────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      if (triggered.current) return
      const threshold = window.innerHeight * TRIGGER_VH
      if (window.scrollY >= threshold) {
        triggered.current = true
        setShow(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Lock body scroll while gate is open ────────────────────────────────
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [show])

  // ── Keyboard ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!show) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Enter') handleSubmit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, value])

  function handleSubmit() {
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setShow(false)
      setValue('')
      setError(false)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setValue('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        backgroundColor: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '40px 36px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          animation: shake ? 'gate-shake 0.45s ease' : undefined,
        }}
      >
        {/* Lock icon */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', textAlign: 'center', marginBottom: '8px', fontFamily: 'inherit' }}>
          This case study is protected
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '28px', lineHeight: 1.6 }}>
          Enter the password to continue reading.
        </p>

        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false) }}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '10px',
            border: `1.5px solid ${error ? '#ef4444' : '#e2e8f0'}`,
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '8px',
            transition: 'border-color 0.15s',
            fontFamily: 'inherit',
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = accentColor }}
          onBlur={e => { if (!error) e.target.style.borderColor = '#e2e8f0' }}
        />

        {error && (
          <p style={{ fontSize: '13px', color: '#ef4444', marginBottom: '12px', textAlign: 'center' }}>
            Incorrect password. Try again.
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: accentColor,
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: error ? '0' : '12px',
            fontFamily: 'inherit',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Unlock
        </button>
      </div>

      {/* Shake keyframe injected once */}
      <style>{`
        @keyframes gate-shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
