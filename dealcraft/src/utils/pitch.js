import { formatRupiah } from './format'

export function generatePitchDraft({
  clientName,
  preset,
  clientProblem,
  includeRate,
  hourlyRate,
  portfolioLink,
  socialMediaLink,
}) {
  const name = clientName?.trim() || '[Nama Klien]'
  const problem =
    clientProblem?.trim() || preset.problemPlaceholder

  const rateLine = includeRate
    ? `\n\nUntuk gambaran awal, tarif kerja sama saya mulai dari ${formatRupiah(
        hourlyRate,
      )}/jam, menyesuaikan cakupan dan kompleksitas proyek.`
    : ''

  const trimmedPortfolio = portfolioLink?.trim()
  const trimmedSocial = socialMediaLink?.trim()

  const linkLines = []
  if (trimmedPortfolio) linkLines.push(`Portofolio: ${trimmedPortfolio}`)
  if (trimmedSocial) linkLines.push(`Media sosial: ${trimmedSocial}`)

  const linksBlock =
    linkLines.length > 0
      ? `\n\nAnda bisa melihat contoh hasil kerja saya di sini:\n${linkLines.join('\n')}`
      : ''

  return `Halo ${name},

Perkenalkan, saya seorang praktisi ${preset.label} yang membantu bisnis seperti milik Anda mengatasi tantangan seputar: ${problem}.

Dari yang saya amati, ini adalah peluang untuk ${preset.valueLine}. Saya ingin menawarkan bantuan untuk menyelesaikan hal ini secara terarah dan sesuai kebutuhan Anda.${rateLine}${linksBlock}

Apakah Anda punya waktu 15 menit minggu ini untuk diskusi singkat? Saya siap menyesuaikan jadwal.

Terima kasih atas waktunya,
[Nama Anda]`
}
