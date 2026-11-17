# Prof Deps — Episode 004

Komposisi: `MistralLarge4News` · 1080 × 1920 · 30 fps.

## Pratinjau

`npm run dev -- --no-open`, lalu buka `http://localhost:3000/MistralLarge4News`.
Properti `showTikTokOverlay` memakai `TikTokSafeAreaOverlay` bersama, persis
seperti episode lain, bukan simulasi UI buatan sendiri. Panduan hanya tampil
di Studio, tidak masuk hasil render. Matikan untuk tampilan bersih.

## Audio dan waktu

- Sumber final: `public/assets/audio/vo-mistral.mp3`.
- Durasi terukur: 46,106063 detik; komposisi 1384 frame / 46,133333 detik.
  Selisih 27,27 ms hanya pembulatan ke frame utuh, bukan ekor yang ditambahkan.
- SHA-256 sumber: `7d83aa3d6cfa5b38c50da66868c8a75c609378854e191351d267b361b30bfc73`.
- Audio diputar sekali: tanpa pemotongan, pengulangan, perubahan kecepatan,
  normalisasi, atau regenerasi. AAC pada MP4 merupakan enkode audio keluaran.
- Subtitle `data/subtitles.json` ditranskripsikan secara lokal dari rekaman
  final dengan Whisper multilingual yang sudah tersedia; nama produk dan ejaan
  teknis diperiksa terhadap sumber. Waktu cue berasal dari timestamp rekaman.
- Bagian penegasan API pada 35,82 detik memakai motion graphic alur aplikasi ke
  API, bukan mengulang kartu pilihan, sesuai urutan narasi asli. Audio tidak
  disusun ulang agar mengikuti urutan storyboard.

## Visual

Revisi pengguna mengembalikan overlay, karakter, subtitle kiri, serta watermark
`@prof.deps` ke komponen bersama yang dipakai episode lain. Karakter diam,
hanya ekspresinya berganti mengikuti setiap bait subtitle dan VO—bukan hanya
saat scene berganti. Subtitle dan karakter memakai anchor terbaru dari
`src/layout/tiktokSafeArea.ts`, tanpa mengubah konstanta bersama atau komposisi
lain. Kanvas solid dan layout adegan tetap dipertahankan.

- Font lokal Plus Jakarta Sans; palet proyek dipertahankan.
- Subtitle satu node tetap selebar 392px, maksimal dua baris, mengikuti posisi
  terbaru komponen bersama dan tetap di atas Y1400. Cue panjang dibagi mengikuti
  timestamp VO tanpa mengubah kata atau audio.
- Scene pembuka memakai lockup resmi Mistral dari `mistral.ai`, bukan foto server
  dan bukan logo buatan sendiri. Varian putih dipakai di kanvas hitam; geometri
  dan warna mark dipertahankan, hanya isi wordmark disesuaikan untuk kontras.
  Tidak ada klaim afiliasi atau dukungan resmi.
- Foto yang tampil tinggal satu: laptop coding historis berlisensi CC0 di scene
  “Mistral Large 4”, dengan satu sumber di atas bingkai. Foto server NERSC tidak
  lagi dipakai di episode ini. Tidak ada label ILUSTRASI atau catatan tambahan
  di atas subtitle.
- Satu sumber yang relevan per scene, tanpa duplikasi sumber pengumuman/foto
  atau baris kredit tambahan; catatan hak dan sumber lengkap tetap di provenance.
- Kartu pengumuman dibuat di React. Scene “Bobot AI Tersedia” memakai screenshot
  asli cuplikan model card Mistral di Hugging Face, disimpan sebagai
  `public/assets/mistral/huggingface-mistral-model-card.png`. Screenshot bukan
  rekonstruksi situs; hanya bagian dokumentasi model, tanpa UI proprietary
  Hugging Face. Teks sumber di dalam screenshot dipertahankan apa adanya.
- Empat scene memakai motion graphic orisinal berbasis React/SVG:
  `Kendali ada di tanganmu` (model bercabang ke API terkelola atau server
  sendiri), `Tetap ada batasnya` (checkpoint lisensi, infrastruktur, keahlian,
  lalu catatan layanan), `Pilihan API tetap ada` (alur aplikasi ke API dengan
  paket bergerak), dan penutup (dua pilihan yang bergantian disorot mengikuti
  narasi). Semua animasi deterministik dan dipicu frame, tanpa video/GIF.
- Tidak ada video, GIF, logo tidak resmi, unduhan bobot model, atau foto latar.
- Opsi API dan infrastruktur sendiri tetap mendapat penekanan visual setara;
  tidak ada satu opsi yang ditampilkan sebagai pemenang.
- Lisensi tidak disebut MIT murni atau bebas syarat. Rincian pengecualian
  internal/produk resmi dan pemicu afiliasi tetap tersedia di provenance dan
  sumber lisensi; paragraf penjelasan layar di atas subtitle sudah dihapus.
  Angka GPU pada screenshot merujuk pelatihan, bukan kebutuhan inference.

Hak penggunaan dan verifikasi fakta: `public/assets/mistral/PROVENANCE.md`.
Salinan lisensi resmi bertaut revisi: `public/assets/mistral/LICENSE-MISTRAL.txt`.

## Validasi dan ekspor

`npm run lint`

Pemeriksaan revisi: `node .preview/episode004/check-prof-deps-revision.mjs`.
Pemeriksaan ini juga membandingkan anchor overlay, karakter, dan subtitle dengan
`Genie4News`, `Gemini4CarbonNews`, serta `TerraVsSolNews`.
Laporan dan frame perwakilan berada di `.preview/episode004/`.
Validasi meliputi batas cue, identitas node subtitle, font lokal, batas fokus,
keberadaan lockup resmi di scene pembuka, motion graphic yang tepat per scene,
kesetaraan penekanan API/server, foto statis, dan panduan TikTok bersama.
Ekspresi karakter memakai 28 cue yang mengikuti 28 bait subtitle (10 pose
unik); QA mencatat 27 perubahan pose pada frame sampel. Pratinjau tambahan
540 × 960 juga diperiksa.

MP4 yang sudah ada berasal dari versi sebelum revisi karakter/branding.
Revisi ini diperbarui di Studio; ekspor ulang hanya saat diminta:

```sh
npx remotion render MistralLarge4News out/episode-004-mistral-large-4.mp4 --codec=h264 --audio-codec=aac --pixel-format=yuv420p --crf=18
```
