import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const cues = JSON.parse(
  await fs.readFile("src/episodes/mistral/data/subtitles.json", "utf8"),
);
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
try {
  const page = await browser.newPage({
    context: () => null,
    logLevel: "error",
    indent: false,
    pageIndex: 0,
    onBrowserLog: null,
    onLog: () => {},
  });
  await page.setViewport({ width: 1450, height: 1100, deviceScaleFactor: 1 });
  const anchors = [];
  for (const id of [
    "Genie4News",
    "Gemini4CarbonNews",
    "TerraVsSolNews",
    "MistralLarge4News",
  ]) {
    await page.goto({ url: `http://localhost:3000/${id}`, timeout: 30000 });
    anchors.push(
      await page.evaluate(async (composition) => {
        while (
          !document.querySelector("[data-character-pose]") ||
          !document.querySelector("[data-tiktok-safe-zone]")
        )
          await new Promise(requestAnimationFrame);
        const char = document.querySelector("[data-character-pose]");
        const sub = document.querySelector('[data-subtitle="stable"]');
        const ui = document.querySelector("[data-tiktok-safe-zone]");
        await document.fonts.ready;
        await char.querySelector("img").decode();
        await ui.decode();
        const c = getComputedStyle(char),
          s = getComputedStyle(sub),
          u = getComputedStyle(ui);
        let opacity = 1;
        for (let p = ui; p; p = p.parentElement)
          opacity *= Number(getComputedStyle(p).opacity);
        return {
          id: composition,
          character: { width: c.width, right: c.right, bottom: c.bottom },
          subtitle: { width: s.width, height: s.height, fontSize: s.fontSize },
          overlay: {
            src: new URL(ui.currentSrc).pathname,
            opacity,
            width: u.width,
            height: u.height,
          },
        };
      }, id),
    );
  }
  const checks = await page.evaluate(async (captions) => {
    const original = document.querySelector('[data-subtitle="stable"]');
    const frames = new Set([
      0, 1, 6, 60, 200, 390, 500, 600, 620, 750, 850, 900, 1020, 1110, 1130,
      1250, 1260, 1330, 1383,
    ]);
    for (const cue of captions)
      for (const f of [-1, 0, 1].map(
        (d) => Math.ceil((cue.startMs * 30) / 1000) + d,
      ))
        if (f >= 0 && f < 1384) frames.add(f);
    const results = [];
    const visible = (n) => {
      for (let p = n; p; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (
          s.display === "none" ||
          s.visibility === "hidden" ||
          Number(s.opacity) === 0
        )
          return false;
      }
      return n.getBoundingClientRect().width > 0;
    };
    for (const frame of [...frames].sort((a, b) => a - b)) {
      window.remotion_setFrame(frame, "MistralLarge4News", 0);
      for (let i = 0; i < 120; i++) {
        await new Promise(requestAnimationFrame);
        if (
          document.querySelector("[data-editorial-frame]")?.dataset
            .editorialFrame === String(frame)
        )
          break;
      }
      await new Promise(requestAnimationFrame);
      const root = document
        .querySelector("[data-mistral-design]")
        .getBoundingClientRect();
      const scale = root.width / 1080;
      const norm = (r) => ({
        left: (r.left - root.left) / scale,
        top: (r.top - root.top) / scale,
        right: (r.right - root.left) / scale,
        bottom: (r.bottom - root.top) / scale,
      });
      const node = document.querySelector('[data-subtitle="stable"]');
      const sub = norm(node.getBoundingClientRect());
      const char = document.querySelector("[data-character-pose]");
      const character = norm(char.getBoundingClientRect());
      const r = document.createRange();
      r.selectNodeContents(node);
      const rects = [...r.getClientRects()]
        .filter((r) => r.width > 0)
        .map(norm);
      const collisions = [];
      for (const n of [
        ...document.querySelectorAll("[data-mistral-focus]"),
      ].filter(visible)) {
        const r = document.createRange();
        r.selectNodeContents(n);
        for (const rect of [...r.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm)) {
          if (
            rect.left < character.right &&
            rect.right > character.left &&
            rect.top < character.bottom &&
            rect.bottom > character.top
          )
            collisions.push(n.textContent);
          if (
            rect.left < sub.right &&
            rect.right > sub.left &&
            rect.top < sub.bottom &&
            rect.bottom > sub.top
          )
            collisions.push(n.textContent);
        }
      }
      await char.querySelector("img").decode();
      const sources = [
        ...document.querySelectorAll("[data-mistral-source]"),
      ].filter(visible);
      const design = document.querySelector("[data-mistral-design]");
      const screenshot = [
        ...document.querySelectorAll("[data-mistral-screenshot]"),
      ].find(visible);
      if (screenshot) await screenshot.decode();
      const logo = document.querySelector("[data-mistral-logo]");
      if (logo) await logo.decode();
      const photos = [...document.querySelectorAll("[data-mistral-photo]")]
        .filter(visible)
        .map((n) => n.getBoundingClientRect().width);
      const motion = [...document.querySelectorAll("[data-mistral-motion]")]
        .filter(visible)
        .map((n) => n.dataset.mistralMotion);
      const expectedMotion =
        frame < 490
          ? null
          : frame < 681
            ? "management"
            : frame < 1075
              ? "limits"
              : frame < 1175
                ? "api-available"
                : "closing-choice";
      const expectedPhoto = frame >= 143 && frame < 305 ? 1 : 0;
      const footerText = [...document.querySelectorAll("[data-mistral-focus]")]
        .filter(visible)
        .filter((n) => norm(n.getBoundingClientRect()).top >= 1160)
        .map((n) => n.textContent);
      results.push({
        frame,
        text: node.textContent,
        sameNode: node === original,
        lines: new Set(rects.map((r) => Math.round(r.top * 100) / 100)).size,
        fits: rects.every(
          (r) =>
            r.left >= sub.left &&
            r.right <= sub.right &&
            r.top >= sub.top &&
            r.bottom <= sub.bottom,
        ),
        subtitle: sub,
        character,
        pose: char.dataset.characterPose,
        collisions,
        branding:
          document.body.textContent.includes("@prof.deps") &&
          !document
            .querySelector("[data-mistral-design]")
            .textContent.includes("KAVDRA STUDIO"),
        customUi: Boolean(document.querySelector("[data-mistral-ui]")),
        sourceCount: sources.length,
        illustrationLabel: /ILUSTRASI/.test(design.textContent),
        footerText,
        screenshotExpected: frame >= 305 && frame < 490,
        screenshotPresent: Boolean(screenshot),
        screenshotReady: Boolean(
          screenshot?.complete &&
          screenshot.naturalWidth === 1436 &&
          screenshot.naturalHeight === 726,
        ),
        logoExpected: frame < 143,
        logoReady: Boolean(logo?.complete && logo.naturalWidth > 0),
        photos: photos.length,
        expectedPhoto,
        motion,
        expectedMotion,
      });
    }
    return results;
  }, cues);
  const failures = checks.filter(
    (c) =>
      !c.sameNode ||
      !c.text ||
      c.lines > 2 ||
      !c.fits ||
      c.subtitle.bottom > 1400 ||
      c.collisions.length ||
      !c.branding ||
      c.customUi ||
      c.sourceCount > 1 ||
      c.illustrationLabel ||
      c.footerText.length ||
      (c.logoExpected && !c.logoReady) ||
      c.photos !== c.expectedPhoto ||
      (c.expectedMotion && !c.motion.includes(c.expectedMotion)) ||
      c.screenshotPresent !== c.screenshotExpected ||
      (c.screenshotExpected && !c.screenshotReady),
  );
  const baseline = JSON.stringify({ ...anchors[0], id: null });
  const anchorMismatches = anchors.filter(
    (a) => JSON.stringify({ ...a, id: null }) !== baseline,
  );
  const poseCount = new Set(checks.map((c) => c.pose)).size;
  const poseChanges = checks.reduce(
    (total, check, index) =>
      index > 0 && check.pose !== checks[index - 1].pose ? total + 1 : total,
    0,
  );
  for (const frame of [60, 300, 620, 900, 1030, 1130, 1250, 1330]) {
    await page.evaluate(async (f) => {
      window.remotion_setFrame(f, "MistralLarge4News", 0);
      for (let i = 0; i < 120; i++) {
        await new Promise(requestAnimationFrame);
        if (
          document.querySelector("[data-editorial-frame]")?.dataset
            .editorialFrame === String(f)
        )
          break;
      }
      await new Promise(requestAnimationFrame);
    }, frame);
    const capture = await page
      ._client()
      .send("Page.captureScreenshot", { format: "png" });
    await fs.writeFile(
      `.preview/episode004/prof-deps-overlay-${frame}.png`,
      Buffer.from(capture.value.data, "base64"),
    );
  }
  await fs.writeFile(
    ".preview/episode004/prof-deps-revision-qa.json",
    JSON.stringify(
      { anchors, checks, failures, anchorMismatches, poseCount, poseChanges },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        frames: checks.length,
        poseCount,
        poseChanges,
        anchors,
        failures,
        anchorMismatches,
      },
      null,
      2,
    ),
  );
  if (
    failures.length ||
    anchorMismatches.length ||
    poseCount < 8 ||
    poseChanges < 20
  )
    process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}
