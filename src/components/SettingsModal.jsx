import { useState } from 'react'
import Stepper from './Stepper.jsx'
import { TEAM_COLORS } from '../lib/model.js'

export default function SettingsModal({ config, teams, onCancel, onSave }) {
  const [draftConfig, setDraftConfig] = useState(config)
  const [draftTeams, setDraftTeams] = useState(teams)

  function updateTeam(id, patch) {
    setDraftTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  return (
    <div className="fixed inset-0 z-30 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button className="text-gray-600 text-[15px]" onClick={onCancel}>
          Cancel
        </button>
        <span className="font-semibold text-gray-800">Settings</span>
        <button
          className="text-red-500 font-semibold text-[15px]"
          onClick={() => onSave(draftConfig, draftTeams)}
        >
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
            Match settings
          </h2>
          <div className="divide-y divide-gray-100">
            <Stepper
              label="Points to win"
              icon="🛡️"
              value={draftConfig.pointsToWin}
              min={1}
              onChange={(v) => setDraftConfig((c) => ({ ...c, pointsToWin: v }))}
            />
            <Stepper
              label="Points to win margin"
              icon="↔️"
              value={draftConfig.winMargin}
              min={1}
              onChange={(v) => setDraftConfig((c) => ({ ...c, winMargin: v }))}
            />
            <Stepper
              label="Rounds to win"
              icon="🏆"
              value={draftConfig.roundsToWin}
              min={1}
              onChange={(v) => setDraftConfig((c) => ({ ...c, roundsToWin: v }))}
            />
            <Stepper
              label="Increment point"
              icon="➕"
              value={draftConfig.increment}
              min={1}
              onChange={(v) => setDraftConfig((c) => ({ ...c, increment: v }))}
            />
            <Stepper
              label="Timer (min.)"
              icon="⏱️"
              value={draftConfig.timerMinutes}
              min={1}
              onChange={(v) => setDraftConfig((c) => ({ ...c, timerMinutes: v }))}
            />
          </div>
        </section>

        {draftTeams.map((team) => (
          <section className="mt-6" key={team.id}>
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
              {team.name || 'Team'}
            </h2>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">✏️</span>
                  <span className="text-[15px]">Name</span>
                </div>
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                  className="text-right text-[15px] font-medium text-gray-800 outline-none border-b border-transparent focus:border-gray-300 max-w-[55%]"
                />
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">🎨</span>
                  <span className="text-[15px]">Color</span>
                </div>
                <div className="flex items-center gap-2">
                  {TEAM_COLORS.map((c) => (
                    <button
                      key={c}
                      aria-label={`Set color ${c}`}
                      onClick={() => updateTeam(team.id, { color: c })}
                      className="w-6 h-6 rounded-full border-2"
                      style={{
                        backgroundColor: c,
                        borderColor: team.color === c ? '#111827' : 'transparent'
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={team.color}
                    onChange={(e) => updateTeam(team.id, { color: e.target.value })}
                    className="w-6 h-6 rounded-full overflow-hidden border-0 p-0 bg-transparent"
                  />
                </div>
              </div>

              <Stepper
                label="Points"
                icon="🛡️"
                value={team.points}
                min={0}
                onChange={(v) => updateTeam(team.id, { points: v })}
              />
              <Stepper
                label="Rounds"
                icon="🏆"
                value={team.rounds}
                min={0}
                onChange={(v) => updateTeam(team.id, { rounds: v })}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
