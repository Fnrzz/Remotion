# Timing audio dan adegan

Komposisi: `KronosDocumentary`, 1080 × 1920, 30 fps.

- Audio final: `public/assets/audio/vo-kronos.mp3` — **47,490563 detik** (ffprobe).
- Durasi timeline: **1.425 frame / 47,5 detik**, dibulatkan ke frame berikutnya. Sisa maksimal 9,5 ms, tanpa memotong rekaman.
- Tidak ada perubahan kecepatan, trimming, audio pengganti, musik, atau efek suara.
- Transkripsi lokal: `whisper-cli` / model `ggml-small.bin`, multilingual, bahasa `id`. Bukti token dan waktu: `.preview/kronos/narration.json`; audio analisis mono 16 kHz: `.preview/kronos/narration.wav`.
- Subtitle produksi: `src/episodes/kronos/data/subtitles.json` (41 cue, tipe Remotion Caption). Segmentasi mengikuti token rekaman, bukan pembagian durasi naskah secara proporsional. Salah dengar ASR `resep/reset` dibetulkan menjadi `riset`; `proyeksiedata` menjadi `proyeksi data`.
- Timestamp ASR merupakan estimasi, bukan hasil forced alignment yang diverifikasi penutur. Pemeriksaan visual menguji cue terhadap timestamp tersebut; review dengar penutur Indonesia tetap disarankan sebelum publikasi.

| Adegan                              | Batas semantik audio | Frame timeline [mulai, akhir) | Waktu timeline |
| ----------------------------------- | -------------------- | ----------------------------- | -------------- |
| Hook                                | 0–4,20               | 0–126                         | 0–4,20         |
| Kenalin, Kronos                     | 4,20–9,32            | 126–280                       | 4,20–9,333     |
| Bukan screenshot / OHLC / waktu     | 9,32–20,56           | 280–617                       | 9,333–20,567   |
| Tokenisasi dan proyeksi             | 20,56–27,72          | 617–832                       | 20,567–27,733  |
| Beberapa skenario                   | 27,72–34,12          | 832–1024                      | 27,733–34,133  |
| Batasan riset                       | 34,12–41,72          | 1024–1252                     | 34,133–41,733  |
| Pertanyaan penutup (dalam adegan 6) | 41,72–akhir          | 1252–1425                     | 41,733–47,50   |

Diagram mengikuti frasa rekaman: candle hook → angka mulai 2,52 s; tabel numerik muncul pada frasa “tapi angka”; sorotan OHLC/waktu mengikuti penyebutannya. Token muncul pada “diubah jadi token”; proyeksi berikutnya terungkap saat narasi mengubah token kembali menjadi data. Jalur skenario memakai durasi reveal yang sama, warna dan ketebalan sama; tidak menyatakan probabilitas.

`calculateKronosMetadata` membaca metadata audio yang sebenarnya dan menolak perubahan durasi lebih dari 80 ms untuk mencegah ekspor dengan timing lama. Jika audio diganti, periksa juga checksum dalam manifest lalu transkripsikan ulang—kesamaan durasi saja bukan bukti kesamaan audio.

Pemeriksaan tambahan FFmpeg `silencedetect=noise=-35dB:d=0.12` menempatkan seluruh batas adegan semantik di dalam jeda rekaman: 3,953–4,392; 9,043–9,401; 20,373–20,626; 27,554–27,789; 33,911–34,195; dan 41,494–41,800 detik. Ini mendukung posisi cut tanpa membuktikan semua timestamp kata secara manual.
