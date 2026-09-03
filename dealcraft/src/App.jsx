import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import RateEstimator from './components/RateEstimator'
import PitchGenerator from './components/PitchGenerator'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { calculateRates } from './utils/calculations'
import { formatRupiah, formatNumber } from './utils/format'

const DEFAULT_RATE_INPUTS = {
  monthlyExpense: 3000000,
  targetProfit: 2000000,
  hoursPerWeek: 20,
  marginBufferPct: 10,
  taxPct: 0,
  nonBillablePct: 15,
}

const DEFAULT_PITCH_INPUTS = {
  clientName: '',
  serviceId: 'web-development',
  clientProblem: '',
  includeRate: true,
  portfolioLink: '',
  socialMediaLink: '',
}

export default function App() {
  const [activeTab, setActiveTab] = useState('estimator')
  const [rateInputs, setRateInputs] = useLocalStorage(
    'dealcraft:rate-inputs',
    DEFAULT_RATE_INPUTS,
  )
  const [pitchInputs, setPitchInputs] = useLocalStorage(
    'dealcraft:pitch-inputs',
    DEFAULT_PITCH_INPUTS,
  )
  const [toast, setToast] = useState({ visible: false, message: '' })
  const toastTimeout = useRef(null)

  const result = calculateRates(rateInputs)

  function showToast(message) {
    setToast({ visible: true, message })
    if (toastTimeout.current) clearTimeout(toastTimeout.current)
    toastTimeout.current = setTimeout(
      () => setToast((prev) => ({ ...prev, visible: false })),
      2400,
    )
  }

  useEffect(() => {
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current)
    }
  }, [])

  function handleExport(calculated) {
    const lines = [
      'DealCraft — Ringkasan Estimasi Tarif',
      '',
      `Pengeluaran bulanan: ${formatRupiah(rateInputs.monthlyExpense)}`,
      `Target profit: ${formatRupiah(rateInputs.targetProfit)}`,
      `Jam kerja per minggu: ${rateInputs.hoursPerWeek} jam`,
      `Margin buffer: ${rateInputs.marginBufferPct}%`,
      `Estimasi pajak: ${rateInputs.taxPct}%`,
      `Waktu non-billable: ${rateInputs.nonBillablePct}%`,
      '',
      `Jam kerja efektif / bulan: ${formatNumber(calculated.effectiveMonthlyHours)} jam`,
      `Tarif minimal per jam: ${formatRupiah(calculated.hourlyRate)}`,
      `Estimasi tarif proyek standar (20 jam): ${formatRupiah(calculated.projectRateStandard)}`,
      '',
      `Dibuat via DealCraft pada ${new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`,
    ]

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'dealcraft-estimasi-tarif.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    showToast('Ringkasan estimasi diunduh')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Tabs active={activeTab} onChange={setActiveTab} />

      <main className="mx-auto max-w-5xl px-6 py-10">
        {activeTab === 'estimator' ? (
          <RateEstimator
            inputs={rateInputs}
            onChange={setRateInputs}
            onExport={handleExport}
          />
        ) : (
          <PitchGenerator
            inputs={pitchInputs}
            onChange={setPitchInputs}
            hourlyRate={result.hourlyRate}
            onCopy={showToast}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        DealCraft — Freelance Rate Estimator &amp; Pitch Generator
      </footer>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
