import fs from "node:fs/promises";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

await fs.mkdir("out", { recursive: true });
const cues = JSON.parse(
  await fs.readFile("src/episodes/mistral/data/subtitles.json", "utf8"),
);
const stamp = (ms) => {
  const n = Math.round(ms);
  return `${String(Math.floor(n / 3600000)).padStart(2, "0")}:${String(Math.floor(n / 60000) % 60).padStart(2, "0")}:${String(Math.floor(n / 1000) % 60).padStart(2, "0")},${String(n % 1000).padStart(3, "0")}`;
};
await fs.writeFile(
  "out/episode-004-mistral-large-4.srt",
  cues
    .map(
      (c, i) =>
        `${i + 1}\n${stamp(c.startMs)} --> ${stamp(c.endMs)}\n${c.text}\n`,
    )
    .join("\n"),
);
const manifest = JSON.parse(
  await fs.readFile("public/assets/documentary/manifest.json", "utf8"),
);
const used = manifest.filter((a) =>
  ["nersc-server-racks", "laptop-coding"].includes(a.id),
);
const assets = [];
for (const a of used) {
  const file = `public/assets/documentary/${a.file}`;
  const meta = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-count_frames", "-show_streams", "-of", "json", file],
      { encoding: "utf8" },
    ),
  );
  if (meta.streams.length !== 1 || Number(meta.streams[0].nb_read_frames) !== 1)
    throw new Error(`Gambar bukan foto statis: ${file}`);
  assets.push({
    file,
    license: a.license,
    creator: a.creator,
    source: a.sourceUrl,
    sourceShort: a.sourceShortUrl,
    width: meta.streams[0].width,
    height: meta.streams[0].height,
    frames: meta.streams[0].nb_read_frames,
    sha256: crypto
      .createHash("sha256")
      .update(await fs.readFile(file))
      .digest("hex"),
  });
}
await fs.writeFile(
  ".preview/episode004/asset-qa.json",
  JSON.stringify({ assets, failures: [] }, null, 2),
);
await fs.writeFile(
  "out/episode-004-mistral-large-4-CREDITS.txt",
  `KAVDRA STUDIO — BERITA AI EPISODE 004
MISTRAL LARGE 4 — LAPORAN EDITORIAL INDEPENDEN

SUMBER FAKTA RESMI
https://mistral.ai/news/mistral-large-4-oss/
https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B
https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B/blob/main/LICENSE

Grafis ringkasan pengumuman, berkas model, dan kartu pilihan dibuat sendiri di React. Bukan screenshot resmi, antarmuka produk, hasil uji deployment, atau demo Mistral. Tidak ada logo Mistral buatan ulang atau bobot model yang diunduh.

LISENSI MODEL
Mistral Ecosystem Open-Weight License, MIT yang dimodifikasi, bukan bebas syarat. Bisnis MaaS, termasuk jika afiliasi menjalankan MaaS, perlu lisensi komersial terpisah untuk penggunaan komersial, dengan pengecualian penggunaan internal dan akses lewat produk resmi Mistral. Definisi, pengecualian produk pengguna akhir/relai permintaan, serta ketentuan lengkap tetap berlaku. Lihat sumber lisensi; ringkasan bukan nasihat hukum.

FOTO ILUSTRASI
${used.map((a) => `${a.creator}\n${a.sourceUrl}\n${a.sourceShortUrl}\n${a.license} — ${a.licenseUrl}\n`).join("\n")}
Foto NERSC adalah dokumentasi infrastruktur historis tahun 2011, bukan pusat data Mistral atau spesifikasi perangkat untuk model. Foto laptop dari 2016 adalah ilustrasi pemrograman, bukan bukti laptop tersebut menjalankan Mistral Large 4. Hak foto laptop mengacu pada dedikasi CC0 historis di Unsplash sebelum 5 Juni 2017, bukan lisensi Unsplash saat ini.

Perubahan penyajian foto: crop persegi panjang dalam bingkai membulat dan zoom perlahan; berkas sumber tidak diubah. CC0 mengizinkan penggunaan komersial. Tidak ada dukungan atau hubungan afiliasi dari fotografer, NERSC, Unsplash, Wikimedia, Mistral, atau Hugging Face yang tersirat. Tidak ada video, GIF, atau foto latar layar penuh.

AUDIO
VO final dari pengguna: assets/audio/vo-mistral.mp3, 46,106063 detik. Tidak diregenerasi, dipercepat, diperlambat, dipotong, atau disusun ulang. Subtitle mengikuti rekaman. Hasil MP4 1384 frame pada 30 fps (46,133333 detik); selisih hanya pembulatan frame.

Dokumentasi lengkap: public/assets/mistral/PROVENANCE.md dan LICENSE-MISTRAL.txt.
Tautan dan kredit ini dapat disertakan dalam deskripsi publikasi.
`,
);
console.log(
  JSON.stringify(
    {
      staticPhotos: assets.length,
      subtitleCues: cues.length,
      credits: "out/episode-004-mistral-large-4-CREDITS.txt",
      failures: [],
    },
    null,
    2,
  ),
);
