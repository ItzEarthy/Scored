function formatTime(totalSeconds) {
  const s = Math.max(0, totalSeconds)
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, '0')
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${mm}:${ss}`
}

export default function TimerPill({ orientation, remainingSeconds, running, onToggle, onReset }) {
  const rotated = orientation === 'landscape'

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 rounded-full shadow-lg flex items-center gap-3 px-4 py-2 ${
        rotated ? 'flex-col' : 'flex-row'
      }`}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <button
        aria-label={running ? 'Pause timer' : 'Start timer'}
        onClick={onToggle}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
      >
        {running ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M7 5v14l12-7z" />
          </svg>
        )}
      </button>

      <span className="font-mono text-sm font-semibold tabular-nums min-w-[3.5ch] text-center">
        {formatTime(remainingSeconds)}
      </span>

      <button
        aria-label="Reset timer"
        onClick={onReset}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
        </svg>
      </button>
    </div>
  )
}
