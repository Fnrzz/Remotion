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
    await new Promise((resolve) => {
      if (document.querySelector('[data-subtitle="stable"]')) return resolve();
      const observer = new MutationObserver(() => {
        if (document.querySelector('[data-subtitle="stable"]')) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    });
    await document.fonts.ready;
    const subtitle = document.querySelector('[data-subtitle="stable"]');
    const frames = [380, 466, 490, 525, 622, 710, 765, 380];
    const snapshots = [];
    for (const frame of frames) {
      window.remotion_setFrame(frame, "Gemini4CarbonNews", 0);
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      // Studio retains hidden/premounted scene DOM. Inspect only the live scene.
      const svg = [...document.querySelectorAll("[data-motion-diagram]")].find(
        (node) =>
          node.getBoundingClientRect().width > 0 &&
          getComputedStyle(node).visibility === "visible",
      );
      const card = svg.closest("[data-carbon-card]");
      const character = document.querySelector("[data-character-pose]");
      const rect = card.getBoundingClientRect();
      const face = character.getBoundingClientRect();
      snapshots.push({
        frame,
        diagram: svg.dataset.motionDiagram,
        state: svg.outerHTML,
        active: [...svg.querySelectorAll('[data-active="true"]')].map(
          (n) => n.dataset.workflowStep,
        ),
        card: [rect.x, rect.y, rect.width, rect.height],
        character: [face.x, face.y, face.width, face.height],
        sameSubtitle:
          subtitle === document.querySelector('[data-subtitle="stable"]'),
        subtitleText: subtitle.textContent,
        illustrationLabel: card.textContent.includes("ILUSTRASI"),
      });
    }
    return snapshots;
  });
  const failures = [];
  if (result[0].state !== result.at(-1).state)
    failures.push("Non-deterministic seek");
  if (result.some((r) => !r.sameSubtitle || !r.illustrationLabel))
    failures.push("Overlay or editorial label changed");
  if (
    !result[0].active.includes("BUG") ||
    !result[2].active.includes("ANALISIS") ||
    !result[3].active.includes("PATCH")
  )
    failures.push("Workflow activation timing mismatch");
  if (
    result.slice(4, 7).some((r) => r.diagram !== "cyber") ||
    result[4].state === result[5].state ||
    result[5].state === result[6].state
  )
    failures.push("Cyber diagram motion missing");
  if (
    result.some(
      (r) =>
        JSON.stringify(r.card) !== JSON.stringify(result[0].card) ||
        JSON.stringify(r.character) !== JSON.stringify(result[0].character),
    )
  )
    failures.push("Layout or mascot moved");
  await fs.writeFile(
    ".preview/episode003/explanation-motion-qa.json",
    JSON.stringify(
      {
        samples: result.map(({ state, ...r }) => r),
        deterministicSeek: result[0].state === result.at(-1).state,
        failures,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        samples: result.map((r) => ({
          frame: r.frame,
          diagram: r.diagram,
          active: r.active,
        })),
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
