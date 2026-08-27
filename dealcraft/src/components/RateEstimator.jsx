import { useMemo, useState } from 'react'
import { calculateRates, STANDARD_PROJECT_HOURS } from '../utils/calculations'
import { formatRupiah, formatNumber, parseNumberInput } from '../utils/format'

function CurrencyField({ id, label, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3.5 transition-colors focus-within:border-indigo-500">
        <span className="mr-2 text-sm text-slate-400">Rp</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value ? formatNumber(value) : ''}
          onChange={(event) => onChange(parseNumberInput(event.target.value))}
          className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  )
}

function NumberField({ id, label, value, onChange, suffix, placeholder, max }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3.5 transition-colors focus-within:border-indigo-500">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value || value === 0 ? value : ''}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, '')
            const parsed = digits ? Number(digits) : 0
            onChange(max ? Math.min(max, parsed) : parsed)
          }}
          className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        {suffix && <span className="ml-2 text-sm text-slate-400">{suffix}</span>}
      </div>
    </div>
  )
}

export default function RateEstimator({ inputs, onChange, onExport }) {
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const result = useMemo(() => calculateRates(inputs), [inputs])

  function update(field) {
    return (value) => onChange({ ...inputs, [field]: value })
  }

  const hasEnoughInput = inputs.hoursPerWeek > 0

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Input form */}
      <section
        aria-labelledby="estimator-form-heading"
        className="animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3"
      >
        <h2 id="estimator-form-heading" className="mb-1 text-base font-semibold text-slate-900">
          Data finansial kamu
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Semua kalkulasi berjalan langsung di browser dan diperbarui secara real-time.
        </p>

        <div className="space-y-5">
          <CurrencyField
            id="monthlyExpense"
            label="Pengeluaran bulanan"
            placeholder="3.000.000"
            value={inputs.monthlyExpense}
            onChange={update('monthlyExpense')}
          />
          <CurrencyField
            id="targetProfit"
            label="Target profit / tabungan bulanan"
            placeholder="2.000.000"
            value={inputs.targetProfit}
            onChange={update('targetProfit')}
          />
          <NumberField
            id="hoursPerWeek"
            label="Total jam kerja per minggu"
            placeholder="20"
            suffix="jam/minggu"
            max={168}
            value={inputs.hoursPerWeek}
            onChange={update('hoursPerWeek')}
          />
        </div>

        <button
          type="button"
          onClick={() => setAdvancedOpen((open) => !open)}
          aria-expanded={advancedOpen}
          className="mt-6 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Opsi lanjutan (buffer & pajak)
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {advancedOpen && (
          <div className="mt-4 grid animate-fade-in-up gap-4 sm:grid-cols-3">
            <NumberField
              id="marginBufferPct"
              label="Margin buffer"
              placeholder="10"
              suffix="%"
              max={200}
              value={inputs.marginBufferPct}
              onChange={update('marginBufferPct')}
            />
            <NumberField
              id="taxPct"
              label="Estimasi pajak"
              placeholder="5"
              suffix="%"
              max={100}
              value={inputs.taxPct}
              onChange={update('taxPct')}
            />
            <NumberField
              id="nonBillablePct"
              label="Waktu non-billable"
              placeholder="15"
              suffix="%"
              max={90}
              value={inputs.nonBillablePct}
              onChange={update('nonBillablePct')}
            />
          </div>
        )}
      </section>

      {/* Output */}
      <section
        aria-labelledby="estimator-result-heading"
        className="lg:col-span-2"
      >
        <div className="sticky top-24 animate-fade-in-up space-y-4">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <h2 id="estimator-result-heading" className="text-sm font-medium text-indigo-700">
              Tarif minimal per jam
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-indigo-700 sm:text-4xl">
              {hasEnoughInput ? formatRupiah(result.hourlyRate) : formatRupiah(0)}
            </p>
            <p className="mt-1 text-xs text-indigo-500">per jam kerja efektif</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-medium text-slate-500">
              Estimasi tarif proyek standar ({STANDARD_PROJECT_HOURS} jam)
            </h3>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {hasEnoughInput ? formatRupiah(result.projectRateStandard) : formatRupiah(0)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm">
            <h3 className="mb-3 font-medium text-slate-700">Ringkasan perhitungan</h3>
            <dl className="space-y-2 text-slate-500">
              <div className="flex justify-between">
                <dt>Total kebutuhan bulanan</dt>
                <dd className="font-medium text-slate-700">{formatRupiah(result.baseNeed)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Setelah buffer &amp; pajak</dt>
                <dd className="font-medium text-slate-700">{formatRupiah(result.bufferedNeed)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Jam kerja efektif / bulan</dt>
                <dd className="font-medium text-slate-700">
                  {formatNumber(result.effectiveMonthlyHours)} jam
                </dd>
              </div>
            </dl>
          </div>

          {!hasEnoughInput && (
            <p className="text-xs text-slate-400">
              Isi jam kerja per minggu untuk melihat estimasi tarif.
            </p>
          )}

          <button
            type="button"
            onClick={() => onExport(result)}
            disabled={!hasEnoughInput}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            Unduh ringkasan estimasi
          </button>
        </div>
      </section>
    </div>
  )
}
