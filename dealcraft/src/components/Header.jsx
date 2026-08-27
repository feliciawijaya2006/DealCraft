export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m-6 4h6m-6 4h4M5 3.5h14a1.5 1.5 0 011.5 1.5v14a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 19V5A1.5 1.5 0 015 3.5z"
              />
            </svg>
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            DealCraft
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Hitung tarif ideal, buat pitching profesional
        </h1>
        <p className="max-w-xl text-sm text-slate-500 sm:text-base">
          Solusi cepat freelancer pemula: dari kalkulasi tarif yang rasional
          sampai draf penawaran yang siap dikirim ke klien.
        </p>
      </div>
    </header>
  )
}
