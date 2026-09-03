import { useMemo, useState } from 'react'
import { SERVICE_PRESETS, getPresetById } from '../utils/presets'
import { generatePitchDraft } from '../utils/pitch'

export default function PitchGenerator({ inputs, onChange, hourlyRate, onCopy }) {
  const [copied, setCopied] = useState(false)
  const preset = getPresetById(inputs.serviceId)

  const draft = useMemo(
    () =>
      generatePitchDraft({
        clientName: inputs.clientName,
        preset,
        clientProblem: inputs.clientProblem,
        includeRate: inputs.includeRate,
        hourlyRate,
        portfolioLink: inputs.portfolioLink,
        socialMediaLink: inputs.socialMediaLink,
      }),
    [inputs, preset, hourlyRate],
  )

  function update(field) {
    return (event) => {
      onChange({ ...inputs, [field]: event.target.value })
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draft)
    } catch {
      // Fallback for browsers without async clipboard support.
      const textarea = document.createElement('textarea')
      textarea.value = draft
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    onCopy('Draf pitching berhasil disalin')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Form */}
      <section
        aria-labelledby="pitch-form-heading"
        className="animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"
      >
        <h2 id="pitch-form-heading" className="mb-1 text-base font-semibold text-slate-900">
          Detail penawaran
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Isi konteks singkat, draf akan diperbarui secara langsung di sebelah kanan.
        </p>

        <div className="space-y-5">
          <div>
            <label htmlFor="clientName" className="mb-1.5 block text-sm font-medium text-slate-700">
              Nama klien
            </label>
            <input
              id="clientName"
              type="text"
              placeholder="Budi / PT Maju Jaya"
              value={inputs.clientName}
              onChange={update('clientName')}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="serviceId" className="mb-1.5 block text-sm font-medium text-slate-700">
              Jenis jasa
            </label>
            <select
              id="serviceId"
              value={inputs.serviceId}
              onChange={update('serviceId')}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500"
            >
              {SERVICE_PRESETS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="clientProblem" className="mb-1.5 block text-sm font-medium text-slate-700">
              Masalah utama klien
            </label>
            <textarea
              id="clientProblem"
              rows={4}
              placeholder={preset.problemPlaceholder}
              value={inputs.clientProblem}
              onChange={update('clientProblem')}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={inputs.includeRate}
              onChange={(event) =>
                onChange({ ...inputs, includeRate: event.target.checked })
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Sertakan tarif per jam dari Kalkulator Tarif di draf ini
          </label>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="mb-1 text-sm font-medium text-slate-700">
              Tautan portofolio &amp; media sosial
            </h3>
            <p className="mb-4 text-xs text-slate-400">
              Opsional — akan otomatis disertakan sebagai lampiran tautan di draf pitching.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="portfolioLink" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Link portofolio
                </label>
                <input
                  id="portfolioLink"
                  type="url"
                  placeholder="https://portfolio-saya.com"
                  value={inputs.portfolioLink || ''}
                  onChange={update('portfolioLink')}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="socialMediaLink" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Link media sosial
                </label>
                <input
                  id="socialMediaLink"
                  type="url"
                  placeholder="https://instagram.com/username"
                  value={inputs.socialMediaLink || ''}
                  onChange={update('socialMediaLink')}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section
        aria-labelledby="pitch-preview-heading"
        className="lg:col-span-3"
      >
        <div className="sticky top-24 animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="pitch-preview-heading" className="text-sm font-medium text-slate-500">
              Pratinjau draf penawaran
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {preset.label}
            </span>
          </div>

          <div className="max-h-[420px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-slate-700">
            {draft}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {copied ? (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Tersalin
              </>
            ) : (
              <>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Pitch Text
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  )
}
