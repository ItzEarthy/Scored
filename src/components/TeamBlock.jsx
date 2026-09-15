import { useRef, useState } from 'react'

const SWIPE_THRESHOLD = 24

export default function TeamBlock({ team, orientation, isLeading, hasWon, increment, onChange }) {
  const startRef = useRef(null)
  const [bump, setBump] = useState(0)

  function handlePointerDown(e) {
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() }
  }

  function handlePointerUp(e) {
    const start = startRef.current
    startRef.current = null
    if (!start) return

    const dy = e.clientY - start.y
    const dx = e.clientX - start.x

    if (Math.abs(dy) < SWIPE_THRESHOLD && Math.abs(dx) < SWIPE_THRESHOLD) {
      trigger(increment)
    } else if (Math.abs(dy) > Math.abs(dx)) {
      trigger(dy < 0 ? increment : -increment)
    }
  }

  function trigger(delta) {
    setBump((b) => b + 1)
    onChange(delta)
  }

  const rotated = orientation === 'landscape'

  return (
    <div
      className="relative flex-1 flex items-center justify-center overflow-hidden select-none touch-none"
      style={{ backgroundColor: team.color }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div
        className={`absolute font-semibold text-lg md:text-xl text-white/90 tracking-wide flex items-center gap-1 ${
          rotated ? 'top-1/2 -translate-y-1/2 [writing-mode:vertical-rl]' : 'top-6'
        }`}
        style={rotated ? { right: '8%' } : undefined}
      >
        {isLeading && <span>👑</span>}
        <span>{team.name}</span>
      </div>

      <div
        key={bump}
        className={`font-bold text-white leading-none animate-pop ${
          hasWon ? 'animate-flash' : ''
        }`}
        style={{ fontSize: 'min(28vw, 22vh)' }}
      >
        {team.points}
      </div>
    </div>
  )
}
