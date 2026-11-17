# Catatan pemeriksaan

## Revisi kanvas penuh, tanpa safe zone — 2 November 2026

- Permintaan eksplisit pengguna mengganti baseline: tidak ada lagi overlay panduan TikTok, fitting safe area atau batas subtitle Y1400 pada Kronos.
- Seluruh adegan ditata ulang dengan margin kiri/kanan 84 px, lebar isi 912 px, headline top240/font88–112 dan main content top720/height660. Tidak ada card/panel dekoratif pada konten utama atau screenshot.
- Komponen `FullCanvasOverlays` terpisah dari modul safe area: watermark top108/right84; karakter width320/right84/bottom100; subtitle tetap satu node/box stabil left84/bottom135/width550/height135/font36. Batas aktual subtitle Y1785, karakter Y1820.
- Lint/TypeScript dan 147 frame QA Studio lulus: tidak ada guide safe zone, clipping kanvas, tabrakan judul/isi/karakter/subtitle, card utama atau perpindahan karakter/subtitle. CTA GitHub tetap hanya di penutup.
- Seluruh keluarga layout, frame 1080 × 1920, serta data/penutup 540 × 960 diperiksa secara visual. Bukti revisi: `.preview/kronos/full-canvas/`.
- Skill `prof-deps-news-style` dan kontrak layout diperbarui; reference full-canvas baru dibuat. Referensi/video lama dipertahankan sebagai riwayat, tidak dimigrasikan diam-diam.
- Tidak ada ekspor MP4 baru; `delivery-qa.json` dan berkas di `out/` tetap versi lama. Review dengar/editorial tetap terpisah dari QA teknis.

## Revisi screenshot GitHub — 2 November 2026

- Screenshot asli `github.com/shiyu-coder/Kronos` ditangkap dari Chrome; identitas repo dan daftar file atas terlihat. Crop/asal-usul dicatat di `public/assets/images/kronos/SOURCES.md`.
- Hanya tampil saat pertanyaan penutup, frame 1252–1424, dengan URL besar untuk dikunjungi. Tidak ada card tambahan atau teks sumber pada scene lain; catatan batasan tetap tampil sebelum penutup.
- Lint lulus. QA Studio 147 frame lulus, termasuk cut sebelum/saat/sesudah CTA, pemuatan gambar, URL yang tepat, subtitle persisten, safe area dan karakter diam.
- Premount Studio dapat menyimpan CTA di DOM dengan opacity nol sebelum waktunya; QA membedakan Sequence aktif dari premount, bukan sekadar mengecek keberadaan node.
- Preview bersih 1080 × 1920, 540 × 960, dan overlay Studio diperiksa. Hasil: `.preview/kronos/github-cta/`.
- Tidak ada render MP4 baru. Hasil ekspor lama di bawah tidak mencakup revisi ini.

## Review pertama — 2 November 2026

- Overlay diganti dengan PNG Orson Lord melalui komponen bersama, sama seperti episode lain; tetap hanya di Studio.
- Card utama di seluruh enam adegan dilepas tanpa menggeser isi. Kotak subtitle stabil dipertahankan.
- Karakter episode lain ditambahkan; 14 pergantian ekspresi mengikuti frasa narasi Kronos. Tidak ada animasi posisi, skala, shake atau bob.
- ESLint/TypeScript lulus. QA Studio revisi memeriksa 147 frame: nol kegagalan, overlay Orson Lord terdeteksi, karakter tetap diam dan tidak bertabrakan, seluruh konten utama tanpa card.
- Frame bersih 1080 × 1920 dan 540 × 960 serta preview overlay diperiksa. Laporan dan preview revisi terpisah di `.preview/kronos/review-1/`; hasil awal di bawah tetap sebagai riwayat.
- **Tidak ada render MP4 baru pada revisi ini. `out/kronos-documentary.mp4` dan `delivery-qa.json` masih merekam versi sebelum review pertama.**

## Implementasi / Studio awal (sebelum review pertama)

- `npm run lint` lulus (ESLint dan TypeScript).
- 147 frame Studio diuji otomatis: frame representatif, sebelum/saat/sesudah setiap awal cue subtitle, dan pergantian adegan.
- Tidak ada kegagalan safe-area, overflow subtitle, atau identitas container subtitle pada laporan `.preview/kronos/studio-qa.json`.
- Font Plus Jakarta Sans lokal termuat sebelum pengambilan frame.
- 41 cue subtitle tanpa jeda buatan di antara cue; maksimal dua baris; container tidak di-remount per cue.
- Frame bersih untuk semua keluarga layout dan uji 540 × 960 dibuat oleh `scripts/kronos-stills.mjs`.
- Frame hook, reveal, OHLC, pipeline, skenario, batasan, serta closing diperiksa secara visual. Source tetap di luar panel; subtitle tidak menutupi chart/headline. Simulasi UI TikTok diuji di Studio dan tidak ikut ke frame render.

## Factual / visual

- Riset ditandai 2025/Agustus 2025, tidak disebut rilis baru November 2026.
- Input adalah angka. Waktu dijelaskan sebagai konteks terpisah; volume/nilai transaksi tidak disangkal.
- Contoh OHLC 100/108/97/104 dan waktu 09:00 dilabeli fiktif. Geometri candle sesuai urutan nilai tersebut.
- Tokenisasi dan autoregresi diterangkan secara sederhana. Bentuk SVG bukan ID tokenizer dan bukan rekaman inference; angka proyeksi fiktif.
- Ketiga jalur skenario berwarna slate yang sama, stroke 3, reveal serentak, tanpa skala harga, ticker, tanggal, probabilitas atau sinyal.
- Tidak ada klaim 93% akurat, benchmark independen, hasil live trading, kepastian harga, atau rekomendasi investasi.
- Semua visual orisinal; tidak ada foto eksternal, screenshot, GIF/video, atau figur paper yang memerlukan izin reproduksi yang belum diperoleh.
- Review sumber independen tidak menemukan blocker faktual/numerik/izin figur. Saran atribusi spesifik tanggal dan risiko, serta konteks waktu terpisah, sudah diterapkan.

## Batas pemeriksaan

Timing subtitle berasal dari rekaman asli melalui ASR lokal, bukan forced alignment yang diaudit. Salah dengar istilah sudah dikoreksi dalam teks. Pemeriksaan identitas/batas box dan waveform tidak sama dengan review dengar oleh penutur. **Review dengar dan persetujuan editorial akhir tetap dianjurkan sebelum publikasi.** Hak voice/akun ElevenLabs adalah informasi aset dari pengguna, bukan hasil audit lisensi penyedia.

Status MP4 dan pemeriksaan stream/decode/korelasi audio dicatat terpisah di `delivery-qa.json` setelah render. Frame hasil MP4 aktual disimpan di `.preview/kronos/export/`.

## Hasil ekspor sebelum review pertama

- MP4 tersedia: `out/kronos-documentary.mp4` (sekitar 2,3 MB).
- H.264, 1080 × 1920, 30 fps, 1.425 frame; `yuv420p`, BT.709, limited range. Frame PNG dipakai untuk menjaga transformasi warna, tanpa mengubah config global.
- AAC stereo 48 kHz, sekitar 189 kb/s; durasi container 47,509 detik (video 47,5 detik; perbedaan kecil berasal dari pengemasan AAC).
- Decode penuh lulus. Korelasi waveform mono 16 kHz dengan MP3 sumber 0,999966; lag terbaik 0 ms.
- Delapan frame yang diekstrak dari MP4 aktual dan contact sheet diperiksa secara visual: teks dan diagram utuh, label fiktif/skenario benar, tidak ada overlay UI pratinjau dalam ekspor.
- `delivery-qa.json` mencatat `failures: []`. Ini lolos pemeriksaan teknis, bukan pengganti persetujuan dengar/editorial akhir.
