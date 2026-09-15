import { useState } from 'react'
import { useInstallPrompt } from '../hooks/useInstallPrompt.js'

export default function InstallButton() {
  const { canInstall, needsIosInstructions, promptInstall } = useInstallPrompt()
  const [showIosHelp, setShowIosHelp] = useState(false)

  if (!canInstall) return null

  function handleClick() {
    if (needsIosInstructions) {
      setShowIosHelp(true)
    } else {
      promptInstall()
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="absolute top-3 right-14 z-20 h-9 px-3 rounded-full bg-black/20 hover:bg-black/30 flex items-center gap-1.5 text-white text-sm font-semibold transition"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 3a1 1 0 011 1v9.59l2.3-2.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.42l2.3 2.3V4a1 1 0 011-1zM5 19a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" />
        </svg>
        Install
      </button>

      {showIosHelp && (
        <div
          className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center px-6"
          onClick={() => setShowIosHelp(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">📲</div>
            <div className="text-lg font-bold text-gray-800 mb-2">Install Scored</div>
            <p className="text-sm text-gray-600 mb-5">
              Tap the <strong>Share</strong> icon in Safari's toolbar, then choose{' '}
              <strong>Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIosHelp(false)}
              className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold active:scale-95 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}
