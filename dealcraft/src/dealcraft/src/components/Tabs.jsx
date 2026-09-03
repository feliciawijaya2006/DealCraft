const TABS = [
  { id: 'estimator', label: 'Kalkulator Tarif' },
  { id: 'pitch', label: 'Pitch Generator' },
]

export default function Tabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Navigasi fitur DealCraft"
      className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl gap-1 px-6">
        {TABS.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`relative px-4 py-4 text-sm font-medium transition-colors sm:text-base ${
                isActive
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              <span
                className={`absolute inset-x-4 -bottom-px h-0.5 rounded-full transition-opacity ${
                  isActive ? 'bg-indigo-600 opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
