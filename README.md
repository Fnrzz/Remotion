# Prof Deps — reusable Remotion template

Template berita vertikal **1080 × 1920, 30 fps** dengan React 19, TypeScript 5.9,
Remotion 4.0.539, dan skills untuk workflow video berbantuan AI.

## Mulai

Gunakan Node `^20.19 || ^22.13 || >=24`.

```bash
npm ci
npm run dev
```

Buka URL yang dicetak Studio, lalu pilih **ProfDepsTemplate** (`/ProfDepsTemplate`).
Contoh 12 detik ini sengaja memakai teks placeholder, tanpa narasi atau klaim berita.

```bash
npm run lint
```

Render hanya jika diperlukan:

```bash
npx remotion render src/index.ts ProfDepsTemplate out/template.mp4
```

## Yang disimpan di Git

- `src/index.ts` — entry point template.
- `src/template/Root.tsx` — registrasi composition.
- `src/template/NewsTemplate.tsx` — contoh hook, penjelasan, dan penutup.
- `src/template/Editorial.tsx` — canvas, headline, dan content stage tanpa kartu.
- `src/template/FullCanvasOverlays.tsx` — karakter, subtitle stabil, watermark.
- `src/fonts.ts`, font lokal beserta OFL/provenance, dan character sheet reusable.
- `.opencode/skills/`, konfigurasi agent, serta dua referensi visual style yang
  masih berlaku.
- Konfigurasi proyek dan dependency lockfile.

Baseline Prof Deps: full canvas, tanpa safe-zone overlay atau kartu konten;
karakter bottom180, subtitle bottom215, watermark teks `@prof.deps`.
Kontrak lengkap ada di
[prof-deps-news-style](.opencode/skills/prof-deps-news-style/SKILL.md).
Referensi gambar dalam skill hanya dokumentasi layout, bukan aset episode baru.

## Pakai ulang

1. Ubah salinan template untuk topik baru; pertahankan geometri yang disetujui.
2. Ganti placeholder, durasi sequence, subtitle, dan cue ekspresi sesuai narasi.
   Caption contoh masih menggunakan milidetik; sesuaikan ketika durasi berubah.
3. Simpan media episode di folder lokal `public/assets/`; panggil dengan `staticFile()`.
   Tambahkan audio sebagai node timeline terpisah jika narasi sudah tersedia.
4. Simpan sumber, lisensi, dan kredit episode dalam dokumentasi lokal, bukan
   overlay sumber di layar. Verifikasi hak penggunaan karakter sebelum redistribusi.
5. Jalankan Studio dan lint. Jangan commit aset atau kode episode hanya untuk
   membuat template berjalan: template ini tidak bergantung pada episode mana pun.

## Batas repo

Repo ini hanya memuat template dan aset reusable. Seluruh kode, audio, foto,
logo, dokumentasi riset, script produksi, preview QA, dan render episode
sebelumnya sudah dihapus dari disk. `public/` sekarang hanya berisi font dan
character sheet reusable.

`.gitignore` tetap mengecualikan episode baru, preview/QA, output render, dan
riset agar tidak ikut ter-commit. Jangan memakai `git add -f` untuk file tersebut.

**Catatan history:** file episode lama masih tersimpan di commit awal
`3607b81`. Commit pembersihan tidak menulis ulang riwayat. Menghapusnya secara
permanen dari history memerlukan proses terpisah dan persetujuan sebelum
force-push.

## Skills dan lisensi

Panduan konfigurasi agent: [.opencode/README.md](.opencode/README.md).
Pertahankan struktur folder skill ketika menyalinnya ke proyek lain.
Tidak ada paket yang di-upgrade untuk kurasi ini.

Proyek tetap `UNLICENSED`. Font mengikuti OFL yang disertakan; penggunaan
Remotion mengikuti [ketentuan lisensi Remotion](https://www.remotion.dev/license).
