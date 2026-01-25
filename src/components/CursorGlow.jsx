import { useState, useEffect, useRef } from 'react'

// Hex lerp: blend between two hex colors
function lerpHex(hexA, hexB, t) {
  const ar = parseInt(hexA.slice(1, 3), 16)
  const ag = parseInt(hexA.slice(3, 5), 16)
  const ab = parseInt(hexA.slice(5, 7), 16)
  const br = parseInt(hexB.slice(1, 3), 16)
  const bg = parseInt(hexB.slice(3, 5), 16)
  const bb = parseInt(hexB.slice(5, 7), 16)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const b = Math.round(ab + (bb - ab) * t)
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

const CYAN = '#00d4ff'
const PURPLE = '#a855f7'
const BLUE = '#3b82f6'

// Position (0–1) → blended color from cyan → blue → purple
function getColorAt(rx, ry) {
  const t = (rx + ry) / 2
  if (t < 0.5) return lerpHex(CYAN, BLUE, t * 2)
  return lerpHex(BLUE, PURPLE, (t - 0.5) * 2)
}

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999, rx: 0.5, ry: 0.5 })
  const raf = useRef(null)
  const posRef = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      const out = x < -10 || y < -10 || x > window.innerWidth + 10 || y > window.innerHeight + 10
      posRef.current = {
        x: out ? -999 : x,
        y: out ? -999 : y,
        rx: Math.max(0, Math.min(1, x / window.innerWidth)),
        ry: Math.max(0, Math.min(1, y / window.innerHeight)),
      }
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        setPos(posRef.current)
        raf.current = null
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  const color = getColorAt(pos.rx, pos.ry)
  const visible = pos.x >= 0 && pos.y >= 0

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          left: pos.x,
          top: pos.y,
          width: 'min(80vw, 600px)',
          height: 'min(80vw, 600px)',
          background: `radial-gradient(circle, ${color}28 0%, ${color}12 40%, transparent 72%)`,
        }}
      />
    </div>
  )
}
