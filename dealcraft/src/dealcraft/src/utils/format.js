export function formatRupiah(value) {
  const number = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number)
}

export function formatNumber(value) {
  const number = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat('id-ID').format(Math.round(number))
}

// Parses a localized "1.250.000" style string back into a raw number.
export function parseNumberInput(raw) {
  if (typeof raw !== 'string') return 0
  const digitsOnly = raw.replace(/[^0-9]/g, '')
  return digitsOnly ? Number(digitsOnly) : 0
}
