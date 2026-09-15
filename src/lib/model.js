export const STORAGE_KEY = 'scored:v1'

export const TEAM_COLORS = [
  '#2f5d8a', // blue
  '#c0392b', // red
  '#4a7a3d', // green
  '#8a5fa8', // purple
  '#d68a1f', // orange
  '#3c8f8f' // teal
]

export function createTeam(id, name, color) {
  return {
    id,
    name,
    color,
    points: 0,
    rounds: 0
  }
}

export function defaultState() {
  return {
    config: {
      pointsToWin: 10,
      winMargin: 1,
      roundsToWin: 3,
      increment: 1,
      timerMinutes: 5
    },
    teams: [
      createTeam('team-1', 'Team 1', TEAM_COLORS[0]),
      createTeam('team-2', 'Team 2', TEAM_COLORS[1])
    ],
    timer: {
      remainingSeconds: 5 * 60,
      running: false
    }
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    const fallback = defaultState()
    return {
      ...fallback,
      ...parsed,
      config: { ...fallback.config, ...parsed.config },
      timer: { ...fallback.timer, ...parsed.timer },
      teams: Array.isArray(parsed.teams) && parsed.teams.length > 0 ? parsed.teams : fallback.teams
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) - fail silently
  }
}

export function teamHasWon(team, allTeams, config) {
  const { pointsToWin, winMargin, roundsToWin } = config
  if (team.rounds >= roundsToWin) return true
  if (team.points >= pointsToWin) {
    const others = allTeams.filter((t) => t.id !== team.id)
    const maxOther = others.length ? Math.max(...others.map((t) => t.points)) : 0
    if (team.points - maxOther >= winMargin) return true
  }
  return false
}
