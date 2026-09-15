import { useEffect, useRef, useState } from 'react'
import TeamBlock from './components/TeamBlock.jsx'
import TimerPill from './components/TimerPill.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import WinBanner from './components/WinBanner.jsx'
import InstallButton from './components/InstallButton.jsx'
import { useOrientation } from './hooks/useOrientation.js'
import { loadState, saveState, teamHasWon } from './lib/model.js'

export default function App() {
  const [state, setState] = useState(loadState)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dismissedWinnerId, setDismissedWinnerId] = useState(null)
  const orientation = useOrientation()
  const intervalRef = useRef(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    if (!state.timer.running) return
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timer.remainingSeconds <= 0) {
          return { ...prev, timer: { ...prev.timer, running: false } }
        }
        return {
          ...prev,
          timer: { ...prev.timer, remainingSeconds: prev.timer.remainingSeconds - 1 }
        }
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [state.timer.running])

  function adjustScore(teamId, delta) {
    setState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) =>
        t.id === teamId ? { ...t, points: Math.max(0, t.points + delta) } : t
      )
    }))
  }

  function toggleTimer() {
    setState((prev) => ({ ...prev, timer: { ...prev.timer, running: !prev.timer.running } }))
  }

  function resetTimer() {
    setState((prev) => ({
      ...prev,
      timer: { running: false, remainingSeconds: prev.config.timerMinutes * 60 }
    }))
  }

  function saveSettings(config, teams) {
    setState((prev) => ({
      ...prev,
      config,
      teams,
      timer: { running: false, remainingSeconds: config.timerMinutes * 60 }
    }))
    setSettingsOpen(false)
  }

  function startNewMatch() {
    setState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => ({ ...t, points: 0, rounds: 0 })),
      timer: { running: false, remainingSeconds: prev.config.timerMinutes * 60 }
    }))
    setDismissedWinnerId(null)
  }

  const maxPoints = Math.max(...state.teams.map((t) => t.points))
  const winner = state.teams.find(
    (t) => t.points === maxPoints && t.points > 0 && teamHasWon(t, state.teams, state.config)
  )
  const showWinBanner = winner && winner.id !== dismissedWinnerId

  return (
    <div className="fixed inset-0">
      <div className={`w-full h-full flex ${orientation === 'landscape' ? 'flex-row' : 'flex-col'}`}>
        {state.teams.map((team) => (
          <TeamBlock
            key={team.id}
            team={team}
            orientation={orientation}
            increment={state.config.increment}
            isLeading={team.points === maxPoints && team.points > 0}
            hasWon={winner?.id === team.id}
            onChange={(delta) => adjustScore(team.id, delta)}
          />
        ))}
      </div>

      <TimerPill
        orientation={orientation}
        remainingSeconds={state.timer.remainingSeconds}
        running={state.timer.running}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />

      <InstallButton />

      <button
        aria-label="Settings"
        onClick={() => setSettingsOpen(true)}
        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm9.4 3a7.4 7.4 0 00-.1-1.2l2-1.6a.5.5 0 00.1-.6l-1.9-3.3a.5.5 0 00-.6-.2l-2.4 1a7.6 7.6 0 00-2-1.2l-.4-2.5a.5.5 0 00-.5-.4h-3.8a.5.5 0 00-.5.4l-.4 2.5c-.7.3-1.4.7-2 1.2l-2.4-1a.5.5 0 00-.6.2L2.6 9.6a.5.5 0 00.1.6l2 1.6a8.4 8.4 0 000 2.4l-2 1.6a.5.5 0 00-.1.6l1.9 3.3c.1.2.4.3.6.2l2.4-1c.6.5 1.3.9 2 1.2l.4 2.5c0 .2.3.4.5.4h3.8c.2 0 .5-.2.5-.4l.4-2.5c.7-.3 1.4-.7 2-1.2l2.4 1c.2.1.5 0 .6-.2l1.9-3.3a.5.5 0 00-.1-.6l-2-1.6c.1-.4.1-.8.1-1.2z" />
        </svg>
      </button>

      {settingsOpen && (
        <SettingsModal
          config={state.config}
          teams={state.teams}
          onCancel={() => setSettingsOpen(false)}
          onSave={saveSettings}
        />
      )}

      {showWinBanner && (
        <WinBanner
          team={winner}
          onDismiss={() => setDismissedWinnerId(winner.id)}
          onNewMatch={startNewMatch}
        />
      )}
    </div>
  )
}
