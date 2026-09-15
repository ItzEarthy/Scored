export default function Stepper({ label, icon, value, min = 0, max = 999, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3 text-gray-700">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-[15px]">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-30 active:scale-95 transition"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-md border border-red-300 text-red-500 flex items-center justify-center active:scale-95 transition"
        >
          +
        </button>
      </div>
    </div>
  )
}
