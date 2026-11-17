# Kronos — paket produksi dokumenter

Posisi overlay disetujui sebagai baseline skill: karakter dan subtitle dinaikkan bersama 80 px dari layout kanvas penuh awal, menyisakan ruang bawah masing-masing 180 px dan 215 px. Ukuran, posisi horizontal, watermark dan konten utama tetap. Preview di `.preview/kronos/raised-overlays/`; MP4 belum diekspor ulang.

Revisi terbaru: **kanvas penuh tanpa safe zone dan tanpa card konten utama**. Overlay PNG, toggle `showTikTokOverlay`, batas Y1400 dan fitting TikTok tidak lagi dipakai oleh Kronos. Margin kiri/kanan seimbang 84 px, judul dan isi diperbesar; karakter/subtitle ditata ulang di bagian bawah kanvas. Narasi, cue dan durasi tetap. **MP4 belum diekspor ulang.**

Screenshot asli GitHub dan URL `github.com/shiyu-coder/Kronos` tetap tampil pada frame 1252–1424 (sekitar 41,7–47,5 detik); batasan tetap pada 34,1–41,7 detik. Aset: `public/assets/images/kronos/github-kronos.png`; asal-usul di `SOURCES.md` pada folder yang sama. Bukti capture asli di `.preview/kronos/github-cta/`. QA/preview layout terbaru di `.preview/kronos/full-canvas/`, termasuk `stills/frame-1350.png` dan `stills/responsive-closing-540.png`.

## Pratinjau dan sumber

- Studio: http://localhost:3000/KronosDocumentary
- Entry episode: `src/KronosDocumentary.tsx`; registrasi ditambahkan di `src/Root.tsx` tanpa menghapus episode lain.
- Komponen reusable, diagram, adegan, subtitle, dan timing: `src/episodes/kronos/`.
- Riset dan pemeriksaan izin: `research-notes.md`, `source-asset-manifest.json`, `Kronos-MIT-LICENSE.txt`.
- Aset yang benar-benar dipakai dan haknya: `production-assets.json`.
- Timing rekaman dan metode subtitle: `timing.md`.
- Subtitle pendamping ekspor: `subtitles.srt`; JSON sumber tetap berada di episode.
- Sumber siap ditempel ke keterangan unggahan: `publication-credits.md`.

Seluruh enam adegan memakai teks/diagram langsung di latar solid, tanpa bidang putih, bingkai, radius atau bayangan card utama. Screenshot penutup juga tanpa frame dekoratif. Kotak subtitle persisten tetap sebagai pengecualian tersendiri; teks sumber tidak dikembalikan. Karakter memakai 14 cue ekspresi khusus narasi Kronos, tanpa gerakan posisi/skala. Tidak ada foto fullscreen, figur paper yang disalin, footage, GIF, ticker nyata, sinyal, atau persentase akurasi/probabilitas.

Overlay baru `src/components/FullCanvasOverlays.tsx` tidak mengimpor modul safe area: watermark top108/right84; karakter width320/right84/bottom180; subtitle left84/bottom215/width550/height135/font36. Skill `prof-deps-news-style`, layout contract dan reference raised-overlays kini mengunci ruang bawah ini untuk episode berikutnya. Video lama dan komponen safe zone historis tidak diubah.

## QA yang dapat diulang

```sh
npm run lint
KRONOS_QA_DIR=.preview/kronos/full-canvas node scripts/kronos-qa.mjs
KRONOS_QA_DIR=.preview/kronos/full-canvas node scripts/kronos-stills.mjs
node scripts/kronos-verify-delivery.mjs # setelah MP4 tersedia
```

Hasil awal dan revisi terdahulu tetap tersimpan terpisah. Laporan terbaru: `.preview/kronos/full-canvas/studio-qa.json`; screenshot Studio di `studio/`, frame bersih 1080 × 1920 dan uji 540 × 960 di `stills/`. Tidak ada guide safe zone di preview maupun hasil render.

QA memeriksa batas kanvas 1080 × 1920 dan tabrakan antar elemen, bukan area UI TikTok. Cakupan: node/posisi subtitle stabil, maksimal dua baris, font termuat, margin editorial x84–996, judul tidak menabrak isi, karakter diam dan tidak bertabrakan, tidak ada card utama atau safe-zone overlay, dan CTA GitHub hanya aktif di penutup. Bottom subtitle kini Y1705; karakter Y1740. Tidak ada lagi offset aman/larangan Y1400.

## Ekspor (versi sebelum review pertama)

```sh
npx remotion render KronosDocumentary out/kronos-documentary.mp4 \
  --codec=h264 --audio-codec=aac --audio-bitrate=192k \
  --pixel-format=yuv420p --image-format=png --color-space=bt709 \
  --crf=16 --concurrency=2 \
  --props='{"audioSrc":"assets/audio/vo-kronos.mp3"}'
```

Hasil dimaksudkan 1080 × 1920, 30 fps, MP4 H.264/AAC, 47,5 detik. Keberadaan file dan hasil pemeriksaan ekspor dicatat di `delivery-qa.json` setelah render, bukan diasumsikan dari implementasi.

Ekspor memakai override PNG/BT.709 khusus perintah ini, tanpa mengubah konfigurasi global proyek yang menggunakan JPEG. Pass JPEG pertama disimpan terpisah di `.preview/kronos/jpeg-first-pass.mp4`, bukan berkas distribusi. MP4 dapat memiliki durasi container beberapa milidetik di atas 47,5 detik karena paket AAC; track video tetap 1.425 frame.

Narasi final adalah aset yang disuplai pengguna. Hak paket ElevenLabs/voice tidak diaudit secara independen. Tidak ada lisensi foto pihak ketiga yang belum diselesaikan karena tidak ada foto yang digunakan. Review dengar penutur Indonesia dan persetujuan editorial akhir tetap disarankan sebelum publikasi.
