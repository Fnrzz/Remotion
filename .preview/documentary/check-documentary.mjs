import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

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
  await page.goto({
    url: "http://localhost:3000/Gemini4CarbonNews",
    timeout: 30000,
  });
  const result = await page.evaluate(async () => {
    while (!document.querySelector('[data-subtitle="stable"]'))
      await new Promise((resolve) => requestAnimationFrame(resolve));
    await document.fonts.ready;
    const subtitle = document.querySelector('[data-subtitle="stable"]');
    const initialFace = document
      .querySelector("[data-character-pose]")
      .getBoundingClientRect();
    const frames = [
      0, 1, 5, 15, 30, 60, 134, 135, 150, 200, 334, 335, 380, 436, 437, 438,
      480, 510, 511, 512, 520, 530, 554, 555, 570, 620, 665, 666, 667, 710, 765,
      776, 777, 790, 900, 1021, 1022, 1040, 1060, 1160, 1230, 1267, 380,
    ];
    const samples = [];
    const isVisible = (n) => {
      if (!n.getBoundingClientRect().width) return false;
      for (let p = n; p; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (
          s.visibility === "hidden" ||
          s.display === "none" ||
          Number(s.opacity) === 0
        )
          return false;
      }
      return true;
    };
    for (const frame of frames) {
      const appliedFrame = () =>
        document.querySelector("[data-editorial-frame]")?.dataset
          .editorialFrame;
      window.remotion_setFrame(frame, "Gemini4CarbonNews", 0);
      let attempts = 0;
      do {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      } while (appliedFrame() !== String(frame) && ++attempts < 120);
      await Promise.all(
        [...document.querySelectorAll("img")]
          .filter(isVisible)
          .map((img) => img.decode().catch(() => {})),
      );
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      const source = document.querySelector("[data-source-frame]");
      const root = subtitle.parentElement.getBoundingClientRect();
      const scale = subtitle.getBoundingClientRect().width / 392;
      const normalize = (r) => ({
        left: (r.left - root.left) / scale,
        top: (r.top - root.top) / scale,
        right: (r.right - root.left) / scale,
        bottom: (r.bottom - root.top) / scale,
        width: r.width / scale,
        height: r.height / scale,
      });
      const headings = [
        ...document.querySelectorAll("[data-carbon-headline]"),
      ].filter(isVisible);
      const photos = [
        ...document.querySelectorAll("[data-documentary-image]"),
      ].filter(isVisible);
      const sourceRect = source
        ? normalize(source.getBoundingClientRect())
        : null;
      const laptop = document.querySelector("[data-agent-frame]");
      const evolution = [
        ...document.querySelectorAll("[data-ai-evolution]"),
      ].find(isVisible);
      const agent = [...document.querySelectorAll("[data-code-agent]")].find(
        isVisible,
      );
      const face = document
        .querySelector("[data-character-pose]")
        .getBoundingClientRect();
      const visibleCaptions = [
        ...document.querySelectorAll("[data-documentary-caption]"),
      ]
        .filter(isVisible)
        .map((n) => n.textContent);
      samples.push({
        frame,
        appliedFrame: appliedFrame(),
        productLogoPresent:
          frame < 139 ||
          frame >= 335 ||
          [...document.querySelectorAll("[data-product-logo]")].some(
            (n) => isVisible(n) && n.complete && n.naturalWidth > 0,
          ),
        closingUnboxed:
          frame < 1026 ||
          (![...document.querySelectorAll("[data-carbon-card]")].some(
            isVisible,
          ) &&
            ![...document.querySelectorAll("img")].some(
              (n) =>
                isVisible(n) && n.src.includes("google-gemini-wordmark.svg"),
            )),
        laptopInstant:
          frame >= 135 ||
          (laptop &&
            getComputedStyle(laptop).opacity === "1" &&
            getComputedStyle(laptop).translate === "none"),
        accessClean:
          frame < 781 ||
          frame >= 1022 ||
          (!source &&
            ![...document.querySelectorAll("[data-carbon-card]")].some(
              isVisible,
            ) &&
            !/SUMBER|BERDASARKAN/i.test(
              document.querySelector("[data-access-content]")?.textContent ??
                "",
            )),
        closingClean:
          frame < 1026 ||
          (!source && photos.length === 0 && Boolean(evolution)),
        evolution: evolution
          ? {
              phase: evolution.dataset.closingPhase,
              box: normalize(evolution.getBoundingClientRect()),
              choices: [
                ...evolution.querySelectorAll("[data-closing-choice]"),
              ].map((n) => ({
                id: n.dataset.closingChoice,
                opacity: Number(getComputedStyle(n).opacity),
              })),
            }
          : null,
        agent: agent
          ? {
              mode: agent.dataset.codeAgent,
              phase: agent.dataset.agentPhase,
              text: agent.querySelector("[data-agent-code]").textContent,
              box: normalize(agent.getBoundingClientRect()),
              codeFits: [...agent.querySelectorAll("[data-code-text]")].every(
                (n) =>
                  n.getBoundingClientRect().right <=
                  agent
                    .querySelector("[data-agent-code]")
                    .getBoundingClientRect().right,
              ),
            }
          : null,
        scene3Clean:
          frame < 335 ||
          frame >= 555 ||
          (!source && (frame < 339 || photos.length === 0)),
        scene4Clean:
          frame < 559 ||
          frame >= 777 ||
          (photos.length === 0 &&
            !document.querySelector("[data-photo-credit]")),
        hookClean:
          frame >= 135 ||
          (!source &&
            !/ilustrasi|sumber|orisinal|bukan|konseptual/i.test(
              document.querySelector("[data-hook-laptop-shell]")?.textContent ??
                "",
            ) &&
            ![...document.querySelectorAll("[data-carbon-card]")].some(
              isVisible,
            )),
        headings: headings.map((n) => ({
          text: n.textContent,
          box: normalize(n.getBoundingClientRect()),
        })),
        source: sourceRect,
        sourceText: source?.textContent ?? null,
        scene2Clean:
          frame < 135 ||
          frame >= 335 ||
          (!source?.textContent.includes("SUMBER: GOOGLE") &&
            ![...document.querySelectorAll("[data-carbon-card]")]
              .filter(isVisible)
              .some((n) => /SUMBER: GOOGLE|FOTO ARSIP/i.test(n.textContent))),
        sourceFont: source
          ? parseFloat(getComputedStyle(source).fontSize)
          : null,
        photos: photos.map((n) => ({
          src: n.src,
          loaded: n.complete && n.naturalWidth > 0,
          framed: Boolean(n.closest("[data-documentary-frame]")),
          box: normalize(
            n.closest("[data-documentary-frame]").getBoundingClientRect(),
          ),
        })),
        subtitleSame:
          subtitle === document.querySelector('[data-subtitle="stable"]'),
        subtitleBottom: normalize(subtitle.getBoundingClientRect()).bottom,
        faceStable:
          Math.abs(face.x - initialFace.x) < 0.01 &&
          Math.abs(face.y - initialFace.y) < 0.01 &&
          Math.abs(face.width - initialFace.width) < 0.01,
        captions: visibleCaptions,
      });
    }
    return {
      samples,
      remote: performance
        .getEntriesByType("resource")
        .filter(
          (e) =>
            /^https?:/.test(e.name) &&
            !e.name.startsWith(location.origin) &&
            !e.name.startsWith("https://bugs.remotion.dev/api/"),
        )
        .map((e) => e.name),
    };
  });
  const failures = [];
  for (const s of result.samples) {
    if (!s.productLogoPresent)
      failures.push(`Scene 02 logo missing ${s.frame}`);
    if (!s.closingUnboxed)
      failures.push(`Closing logo/card remains ${s.frame}`);
    if (!s.laptopInstant) failures.push(`Laptop entrance remains ${s.frame}`);
    if (!s.accessClean) failures.push(`Access card/source remains ${s.frame}`);
    if (!s.closingClean)
      failures.push(`Closing motion/source mismatch ${s.frame}`);
    if (
      s.evolution &&
      (s.evolution.box.left < 110 ||
        s.evolution.box.right > 850 ||
        s.evolution.box.bottom > 1400)
    )
      failures.push(`Closing safe area ${s.frame}`);
    if (!s.scene3Clean || !s.scene4Clean)
      failures.push(`Removed motion-scene photos/credits ${s.frame}`);
    if (
      s.agent &&
      (!s.agent.codeFits ||
        s.agent.box.right > 850 ||
        s.agent.box.bottom > 1400)
    )
      failures.push(`Agent safe area ${s.frame}`);
    if (!s.scene2Clean) failures.push(`Scene 02 has removed labels ${s.frame}`);
    if (!s.hookClean) failures.push(`Hook has removed labels/card ${s.frame}`);
    if (s.appliedFrame !== String(s.frame)) failures.push(`Seek ${s.frame}`);
    if (!s.subtitleSame || s.subtitleBottom > 1400 || !s.faceStable)
      failures.push(`Fixed overlays ${s.frame}`);
    if (
      s.photos.some(
        (p) =>
          !p.loaded || !p.framed || p.box.width > 700 || p.box.height > 600,
      )
    )
      failures.push(`Image framing/loading ${s.frame}`);
    if (
      s.source &&
      (s.source.left < 110 ||
        s.source.right > 850 ||
        s.source.bottom > 1400 ||
        s.sourceFont !== 16)
    )
      failures.push(`Source safe area ${s.frame}`);
    if (
      s.source &&
      ![135, 335, 555, 777, 1022].includes(s.frame) &&
      s.headings.some((h) => h.box.bottom > s.source.top + 1)
    )
      failures.push(`Headline/source collision ${s.frame}`);
  }
  for (const [frame, mode, phase, fragment] of [
    [380, "bug", "search", "total = item.harga;"],
    [480, "bug", "found", "total = item.harga;"],
    [530, "bug", "repair", "total += item.harga;"],
    [620, "security", "search", "const input = data;"],
    [710, "security", "found", "const input = data;"],
    [765, "security", "repair", "const input = validasi(data);"],
  ]) {
    const sample = result.samples.find((s) => s.frame === frame);
    if (
      sample?.agent?.mode !== mode ||
      sample?.agent?.phase !== phase ||
      !sample?.agent?.text.includes(fragment)
    )
      failures.push(`Agent phase/code ${frame}`);
  }
  for (const [frame, phase] of [
    [1060, "growth"],
    [1160, "developer"],
    [1230, "oversight"],
    [1267, "oversight"],
  ]) {
    if (
      result.samples.find((s) => s.frame === frame)?.evolution?.phase !== phase
    )
      failures.push(`Closing phase ${frame}`);
  }
  if (
    result.samples
      .find((s) => s.frame === 1267)
      ?.evolution?.choices.some((c) => c.opacity !== 1)
  )
    failures.push("Final choices not held");
  if (result.remote.length) failures.push("Remote resources at preview time");
  await fs.writeFile(
    ".preview/documentary/studio-documentary-qa.json",
    JSON.stringify({ ...result, failures }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        samples: result.samples.length,
        uniquePhotos: [
          ...new Set(result.samples.flatMap((s) => s.photos.map((p) => p.src))),
        ].length,
        failures,
      },
      null,
      2,
    ),
  );
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}
