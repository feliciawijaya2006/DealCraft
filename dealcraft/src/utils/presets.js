// Presets Kategori Jasa (Section 5, fitur 4): default copy tuned per bidang jasa.
export const SERVICE_PRESETS = [
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    problemPlaceholder:
      'Materi visual brand belum konsisten dan kurang menarik di media sosial',
    valueLine:
      'membantu menghadirkan identitas visual yang konsisten dan mudah dikenali audiens',
  },
  {
    id: 'web-development',
    label: 'Web Development',
    problemPlaceholder:
      'Website perusahaan lambat, tidak responsif di HP, dan sulit diperbarui',
    valueLine:
      'membangun website yang cepat, responsif, dan mudah dikelola sendiri ke depannya',
  },
  {
    id: 'content-writing',
    label: 'Content Writing',
    problemPlaceholder:
      'Konten blog dan media sosial jarang update sehingga engagement menurun',
    valueLine:
      'menyusun konten terjadwal yang relevan dengan audiens dan konsisten dari sisi kualitas',
  },
  {
    id: 'social-media',
    label: 'Social Media Management',
    problemPlaceholder:
      'Akun media sosial pasif dan belum punya strategi konten yang jelas',
    valueLine:
      'mengelola strategi konten dan jadwal posting agar akun tumbuh secara konsisten',
  },
]

export function getPresetById(id) {
  return SERVICE_PRESETS.find((preset) => preset.id === id) || SERVICE_PRESETS[0]
}
