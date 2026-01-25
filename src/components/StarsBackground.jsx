import { useMemo, useEffect, useState } from 'react'

// Static star positions — created once to avoid layout shift
function useStars(count = 120) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  }, [count])
}

export default function StarsBackground() {
  const stars = useStars(140)
  const [shoot, setShoot] = useState(false)

  // Occasional shooting star
  useEffect(() => {
    const run = () => {
      setShoot(true)
      const t = setTimeout(() => setShoot(false), 1500)
      return () => clearTimeout(t)
    }
    run()
    const id = setInterval(run, 8000 + Math.random() * 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting star */}
      {shoot && (
        <div
          className="absolute w-24 h-[2px] bg-gradient-to-r from-white via-accent-cyan to-transparent animate-shoot opacity-80"
          style={{ top: '12%', left: '5%' }}
        />
      )}

      {/* Subtle gradient orbs (deep space feel) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[100px]" />

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
