import { formatRupiah } from './format'

export function generatePitchDraft({
  clientName,
  preset,
  clientProblem,
  includeRate,
  hourlyRate,
}) {
  const name = clientName?.trim() || '[Nama Klien]'
  const problem =
    clientProblem?.trim() || preset.problemPlaceholder

  const rateLine = includeRate
    ? `\n\nUntuk gambaran awal, tarif kerja sama saya mulai dari ${formatRupiah(
        hourlyRate,
      )}/jam, menyesuaikan cakupan dan kompleksitas proyek.`
    : ''

  return `Halo ${name},

Perkenalkan, saya seorang praktisi ${preset.label} yang membantu bisnis seperti milik Anda mengatasi tantangan seputar: ${problem}.

Dari yang saya amati, ini adalah peluang untuk ${preset.valueLine}. Saya ingin menawarkan bantuan untuk menyelesaikan hal ini secara terarah dan sesuai kebutuhan Anda.${rateLine}

Apakah Anda punya waktu 15 menit minggu ini untuk diskusi singkat? Saya siap menyesuaikan jadwal.

Terima kasih atas waktunya,
[Nama Anda]`
}
