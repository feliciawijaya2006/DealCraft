# DealCraft

Freelance Rate Estimator & Pitch Generator — dari hitung tarif hingga deal klien.

Dibangun dengan **React.js (JavaScript, bukan TypeScript)** dan **Tailwind CSS**, sesuai spesifikasi proyek. Semua kalkulasi berjalan real-time di browser, tanpa backend atau login.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk production

```bash
npm run build
```

Hasil build ada di folder `dist/`.

## Deploy

Proyek ini adalah static site murni (tanpa backend), sehingga bisa langsung di-deploy ke **Vercel** atau **Netlify**:

- **Vercel:** import repo, framework preset "Vite" akan terdeteksi otomatis, klik Deploy.
- **Netlify:** build command `npm run build`, publish directory `dist`.

## Struktur proyek

```
src/
  components/       Header, Tabs, RateEstimator, PitchGenerator, Toast
  hooks/            useLocalStorage — persistensi input pengguna
  utils/            calculations, format, presets, pitch generator
  App.jsx           State utama & tab switching
  index.css         Tailwind + gaya dasar
```

## Fitur

- **Kalkulator Tarif** — input pengeluaran bulanan, target profit, jam kerja, dengan opsi lanjutan (margin buffer, pajak, waktu non-billable). Hasil tarif per jam & per proyek diperbarui real-time.
- **Pitch Generator** — form nama klien, jenis jasa, dan masalah utama klien menghasilkan draf email penawaran secara instan, dengan preset per kategori jasa (Graphic Design, Web Development, Content Writing, Social Media Management).
- **Copy & Export** — salin draf pitching ke clipboard sekali klik, atau unduh ringkasan estimasi tarif sebagai file teks.
- **Persistensi lokal** — input tersimpan otomatis di `localStorage` sehingga tidak hilang saat halaman di-refresh.

## Rumus kalkulator

```
Tarif per Jam = [ (Pengeluaran Bulanan + Target Profit) x (1 + Margin Buffer + Pajak) ] / Jam Kerja Efektif Bulanan
```

Jam Kerja Efektif Bulanan = Jam per Minggu x 4.3 minggu x (1 − % waktu non-billable).
