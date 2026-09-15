export default function WinBanner({ team, onDismiss, onNewMatch }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs text-center">
        <div className="text-4xl mb-2">👑</div>
        <div className="text-lg font-bold text-gray-800 mb-1">{team.name} wins!</div>
        <div className="text-sm text-gray-500 mb-5">
          {team.points} points · {team.rounds} rounds
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onDismiss}
            className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold active:scale-95 transition"
          >
            Continue
          </button>
          <button
            onClick={onNewMatch}
            className="w-full py-2.5 rounded-lg text-white font-semibold active:scale-95 transition"
            style={{ backgroundColor: team.color }}
          >
            New match
          </button>
        </div>
      </div>
    </div>
  )
}
