# Kronos: primary-source research and editorial guardrails

Researched 2026-11-02. Scope: factual research, source/asset planning and licensing only. No images, model weights, video, audio, screenshots or other media were downloaded or generated. Companion inventory: `source-asset-manifest.json`. Any existing application changes are outside this work.

## Editorial conclusion

Kronos models **numerical candlestick records**, not screenshots of price charts. Its language-model analogy is tokenization and autoregressive sequence generation, not reading images or financial news. Explain it with independently designed, attributed evidence cards and diagrams. No photographs are necessary.

Suggested Indonesian summary (original paraphrase):

> Kronos mempelajari urutan angka pasar, bukan foto grafik. Data harga dan aktivitas transaksi diubah menjadi token, lalu model menghasilkan beberapa kemungkinan kelanjutan. Ini prediksi probabilistik, bukan jaminan profit. Paper pertamanya disubmit pada 2 Agustus 2025.

Do not call this a new November 2026 launch. Avoid unqualified “first ever,” “AI knows tomorrow's price,” “93% accurate,” or “guaranteed profit.” The README's “first open-source foundation model” is the authors' priority claim, not independently established here.

## Source registry

The JSON manifest records immutable revisions where available. The four requested originals were all read directly, with additional original code/license checks.

| ID  | Original source                                                                                                          | Verified location / use                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | https://github.com/shiyu-coder/Kronos                                                                                    | Official repository and README: Introduction, News, Model Zoo, Making Forecasts, production disclaimer. Snapshot commit `67b630e67f6a18c9e9be918d9b4337c960db1e9a`. |
| S2  | https://huggingface.co/NeoQuasar/Kronos-base                                                                             | Official model card and Hub API. Snapshot revision `2b554741eca47781b64468546e77fef3e85130e6`.                                                                      |
| S3  | https://arxiv.org/html/2508.02739v1                                                                                      | Original paper v1, not an unspecified later revision. Methodology §2–3; Appendix C implementation; Appendix D evaluation; Appendix H discussion.                    |
| S4  | https://shiyu-coder.github.io/Kronos-demo/                                                                               | Public example dashboard, with a stale historical timestamp at retrieval.                                                                                           |
| S5  | https://arxiv.org/abs/2508.02739v1                                                                                       | Exact submission history and article-specific license link.                                                                                                         |
| S6  | https://raw.githubusercontent.com/shiyu-coder/Kronos/67b630e67f6a18c9e9be918d9b4337c960db1e9a/LICENSE                    | Full MIT text, copyright holder/year.                                                                                                                               |
| S7  | https://raw.githubusercontent.com/shiyu-coder/Kronos/67b630e67f6a18c9e9be918d9b4337c960db1e9a/model/kronos.py            | Predictor input columns, normalization, sampling, calendar extraction, output decoding.                                                                             |
| S8  | https://raw.githubusercontent.com/shiyu-coder/Kronos/67b630e67f6a18c9e9be918d9b4337c960db1e9a/model/module.py            | Binary spherical quantizer, hierarchical embeddings, causal attention, temporal embeddings.                                                                         |
| S9  | https://arxiv.org/licenses/nonexclusive-distrib/1.0/                                                                     | Actual arXiv article-license terms, not Creative Commons.                                                                                                           |
| S10 | https://info.arxiv.org/help/license/reuse.html                                                                           | arXiv's guidance on figure/full-text reuse.                                                                                                                         |
| S11 | https://raw.githubusercontent.com/shiyu-coder/Kronos-demo/c56b787aaa90cff9ff826231a7bcc2746ae63340/update_predictions.py | Demo configuration, sample-derived metrics and min–max chart range. Read at `master`, then pinned to the observed head.                                             |

## Methodology: what the model actually does

### 1. Inputs are numbers, not images

- Paper §2 fixes **D = 6**: open, high, low, close, volume and amount/turnover (**OHLCVA**). A candle represents one interval's multidimensional numerical record. OHLCV is convenient shorthand in the README; the precise research input also includes amount. [S3 §2](https://arxiv.org/html/2508.02739v1#S2)
- The released API takes a pandas DataFrame plus historical and forecast timestamps. OHLC columns are required; volume and amount can be absent. No image tensor, screenshot, computer-vision encoder or OCR step is present in this input path. [S1 Making Forecasts; S7 `KronosPredictor.predict`]
- Current code fills both activity fields with zero if volume is absent. If volume exists but amount does not, it estimates amount as volume times the mean of the four prices. This is more specific than the README's batch statement that missing optional fields are zero-filled. Prefer “optional activity fields are handled by preprocessing” in narration. [S7 `predict` and `predict_batch`]
- Features are independently z-score normalized over the input window and clipped to [-5, 5]; predictions are inverse-normalized afterward. [S3 Appendix C Input Preprocessing; S7 `predict`]

### 2. Calendar features are a separate input

- The implementation extracts **minute of hour (0–59), hour of day, weekday, day of month and month**. Dedicated embedding vectors are summed and added to the fused token embedding. [S7 `calc_time_stamps`; S8 `TemporalEmbedding`; S3 Appendix C Temporal Embeddings]
- Important discrepancy: Appendix C says “minute-of-day”; the actual code uses pandas `.dt.minute` and 60 embedding entries. For implementation-accurate explanations say “menit, jam, hari dalam pekan, tanggal, bulan,” not “1,440 minutes-of-day.”
- These are calendar/cyclical context, not future market measurements. The API accepts future timestamps; it does not require future OHLCVA prices as input. There is no year feature in this released five-feature extractor. RoPE separately supplies relative sequence position. [S7, S8]

### 3. Learned financial tokenizer

- Stage one is a Transformer-based autoencoder with Binary Spherical Quantization (BSQ), adapted from visual-tokenization research but applied here to **numerical** market records. Borrowing an image/video quantization method does not mean the model consumes chart images. [S3 §3 K-line Tokenization](https://arxiv.org/html/2508.02739v1#S3.SSx1)
- Each bar gets a hierarchical code: a coarse subtoken plus a fine subtoken. A dual reconstruction objective trains the coarse part to capture principal structure and the full code to reconstruct more detail. The tokenizer objective also includes quantization regularization. [S3 equations 2 and following explanation]
- For the base tokenizer/model configuration the two pieces are **10 bits each**: 1,024 possibilities per subtoken, or 2^20 combined possibilities. This is not a vocabulary of English words or 20 categories. [S3 §3; S2 pinned `config.json` has `s1_bits: 10`, `s2_bits: 10`]
- Use a new diagram with six numerical fields → normalization → coarse/fine token blocks. Do not trace Figure 2 or 3's visual design.

### 4. Hierarchical autoregression

- Stage two is a causal, decoder-only Transformer trained on tokenized financial sequences. It predicts the next coarse subtoken, then predicts the fine subtoken conditioned on the history and that coarse token. This repeats across forecast steps. [S3 §3 equations 3–8](https://arxiv.org/html/2508.02739v1#S3.SSx2)
- The paper describes sampling the model's coarse prediction during training rather than feeding the ground-truth coarse token into the fine head, to reduce exposure bias. Current code additionally exposes an optional teacher-forcing path; do not claim that such a path is impossible. [S3 Fine Subtoken Prediction; S7 `Kronos.forward`]
- Predicted codes are decoded back to continuous OHLCVA values. Tokens are a learned representation, not literal price labels. [S7 `auto_regressive_inference`, `KronosTokenizer.decode`]

### 5. Sampling and uncertainty

- Temperature and top-p/nucleus sampling control stochastic generation; the released code also exposes top-k. Multiple rollouts can produce different future paths from the same past. [S3 §3 Inference; S7 sampling functions]
- The main predictor averages decoded paths when `sample_count > 1`; its ordinary return is an averaged six-column DataFrame, not automatically a calibrated confidence interval or every individual path. [S7 `auto_regressive_inference` and `predict`]
- Paper Appendix C Table 6 uses T=0.6, top-p=0.90, N=10 for price/return forecasting and investment simulation; volatility uses T=0.9, top-p=0.90, N=1; synthetic generation uses T=1.0, top-p=0.95, N=1. These are experimental settings, not universal defaults.
- The paper's test-time-scaling result reports that averaging more samples improves its measured forecasting performance at extra compute cost. This does not establish error-free or profitable live trading. [S3 §4 Test-Time Scaling]

## Dates and release precision

- **Verified original research date: 2 August 2025.** arXiv v1 submission history is **Sat, 2 Aug 2025 13:15:59 UTC**; README News also labels its paper announcement `2025.08.02`. [S5; S1]
- Safest narration: “Paper Kronos pertama kali disubmit pada 2 Agustus 2025” or “riset yang diperkenalkan pada Agustus 2025.” This is not proof that all code and weights first became public at precisely that timestamp.
- Repository API `created_at` is 2025-07-01; Hub API `createdAt` is 2025-06-30 for Kronos-base. Creation timestamps can predate a public announcement and do not establish public availability. Do not re-label those metadata dates as the definitive launch. [API URLs in manifest]
- README dates fine-tuning scripts to 17 August 2025. Present-day README/model-zoo/demo content can include additions after v1. In particular, paper Table 1 lists small/base/large, while the current release table also includes mini; do not silently attribute every current artifact to original release day.

## Corpus, model availability and results

| Fact                                                                                                               | Exact primary-source support                                                                        | Editorial treatment                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Authors report over 12 billion K-line observations from 45 global exchanges                                        | S3 abstract and §3 Dataset; S2 Introduction                                                         | Attribute to the researchers; not 12 billion screenshots. README sometimes says “over 45”; use the abstract's “45” to avoid false precision. |
| Three principal paper model sizes: small 24.7M, base 102.3M, large 499.2M                                          | S3 Table 1                                                                                          | Base is roughly 102 million parameters, not a general-purpose text LLM.                                                                      |
| Current public release table includes mini 4.1M, small 24.7M and base 102.3M; large is not publicly released there | S1 Model Zoo; S2 Model Zoo                                                                          | Do not claim all four variants have downloadable weights.                                                                                    |
| Base weights really exist                                                                                          | S2 Hub API lists `model.safetensors`, `config.json`, README; exact count 102,311,008 F32 parameters | Verified artifact listing, not just a promotional statement. No weights downloaded.                                                          |
| Base/small listed context is 512 bars; mini is currently listed as 2,048                                           | S1, S2 Model Zoo; S3 training section fixes 512 for paper models                                    | Context length is not a universal 512-hour or fixed 24-hour forecast limit. Bar frequency matters.                                           |
| Paper reports 93% higher price-series RankIC vs strongest TSFM and 87% vs best non-pretrained baseline             | S3 abstract and §4 Main Results                                                                     | Relative metric gains on their benchmark. **Not 93% directional accuracy, 93% probability, or +93% investment return.**                      |
| Paper reports 9% lower volatility MAE and 22% improvement in synthetic generative fidelity                         | S3 abstract, §4 and Appendix D metrics                                                              | Different tasks/metrics, not one accuracy score; attribute as reported research results.                                                     |
| Tested tasks include price series, returns, realized volatility, synthetic data, investment simulation             | S3 §4 and Appendix D                                                                                | Simulated investment results are not independently verified live performance.                                                                |
| Released fine-tuning pipeline is explicitly a simplified demonstration, not production-ready                       | S1 disclaimer and From Demo to Production                                                           | Include a plain risk caveat; costs, slippage, risk management and changing market conditions matter.                                         |

The paper itself uses somewhat inconsistent corpus-frequency/exchange wording between the abstract, main text and appendix. For a short editorial treatment, avoid inventing an exhaustive frequency count; use “berbagai pasar dan interval waktu” and cite the authors' headline corpus size.

## Demo: documentary evidence, not a current trading signal

At retrieval S4 displayed:

- Last updated UTC: **2026-07-04 11:00:26** — stale relative to research date 2026-11-02.
- BTC/USDT, Binance, 1-hour interval; a next-24-hours illustrative forecast.
- Upside probability 66.7%; volatility amplification 83.3%.
- Page-described methodology: Kronos-mini (~4M), 360-hour context, 30 Monte Carlo paths; orange mean and shaded full sample range.

**Do not present these as today's probabilities or as an August 2025 screenshot.** Prefer to omit the two percentages entirely. If documenting this page, label the last-updated timestamp prominently and say “contoh historis pada demo resmi.” The repository README's “next 24 hours” is an interface description, not proof of freshness.

Code check [S11]: upside probability is the fraction of sampled final closes above the last close. Volatility amplification is the fraction of paths whose forecast log-return standard deviation exceeds the historical one. The plotted uncertainty band is the sample **min–max**, not a 95% confidence/credible interval and not an exhaustive set of all possible outcomes. A sample fraction is not a separately verified, calibrated real-world confidence level.

Implementation detail: the page says 360 context hours, but the updater fetches `HIST_POINTS + VOL_WINDOW = 384` bars, drops the last incomplete bar, and passes the remaining 383 to prediction; 360 is the displayed historical tail. If mentioning 360, explicitly call it the page's description rather than independently verified exact input length. The demo uses its own predictor implementation returning paths; do not assume the main repository predictor returns paths in the same shape.

## Licensing: exact verification and reuse decision

This is production risk guidance, not legal advice. Attribution is good practice but cannot substitute for a missing permission grant.

### Code and README documentation

- S6 says **MIT License**, **Copyright (c) 2025 ShiYu**. The grant covers “this software and associated documentation files,” permits use/copy/modification/distribution and commercial uses, and requires the copyright and permission notice in copies or substantial portions. It includes an AS-IS/no-warranty disclaimer.
- Official README ends “This project is licensed under the MIT License.” Thus authored README text is a stronger reuse candidate than an entire webpage screenshot.
- A local full license transcription is provided at `Kronos-MIT-LICENSE.txt`. If substantial verbatim MIT text/code enters a distributed editorial package, carry that notice with the distributed material/credits package; merely keeping it in private production notes is not automatically sufficient. For short paraphrases of factual methodology, use source attribution rather than copying large text blocks.
- This license does not itself license GitHub/Hugging Face website chrome, third-party avatars, trademarks, externally hosted badges or underlying market datasets. Some code comments identify borrowed upstream implementations; do not assume all third-party material is independently cleared by the root label.

### Weights

- S2's official model card front matter explicitly says `license: mit`; Hub API independently reports `cardData.license: mit` and `license:mit`. The card's License section also declares MIT.
- The Hub file list for the checked base revision contains `.gitattributes`, `README.md`, `config.json`, `model.safetensors`, with **no standalone LICENSE file**. Its card license link currently uses the GitHub `main` branch while the actual repository default is `master`; use the verified S6 path for the full notice.
- Therefore: **base weights are publisher-declared MIT**, with full terms obtained from the linked official code project, not a separately observed weights-license file. This does not license training data or all outputs/third-party rights. No weights are needed for this editorial explainer.

### Paper and figures

- The article-specific license link in S5 is `http://arxiv.org/licenses/nonexclusive-distrib/1.0/`; HTML v1 labels it **“arXiv.org perpetual non-exclusive license.”** The v1 paper is **not labeled CC BY or MIT**.
- S9 grants arXiv a perpetual non-exclusive right to distribute the article. It is not a general downstream license to reproduce figures. S10 explicitly says that for this license one should contact the submitter/copyright holder to determine figure permissions.
- Accordingly, do **not** mark paper figures, PDF-page screenshots or figure crops “cleared because arXiv is open access.” Obtain written permission, document a separately applicable grant for the exact asset, or use a jurisdiction-specific legal exception reviewed for the use. “Editorial” alone is not an automatic worldwide exemption.
- Nuance: official GitHub `figures/overview.png`, `prediction_example.png` and other images are in the MIT-labeled repository, with no separate license entry visible in the checked figures directory. The root MIT declaration is evidence supporting reuse of authored repository documentation assets. It does **not** justify relabeling every paper figure as MIT or establish provenance of every visual/market-data element. If reusing an exact repo figure, pin its repository path/revision, retain MIT notices, and check third-party content. Current project decision: do not reuse them; create a visually independent diagram instead.

### Screenshots and demo

- A whole GitHub/Hugging Face/arXiv screenshot mixes project material with platform UI/logos. The repository's MIT license is not blanket clearance for the entire screenshot. A narrowly framed source screenshot can serve documentary criticism under applicable exceptions, but is not universally “safe.” Prefer plain text project names, citations and independently designed editorial cards.
- Demo footer says **“© 2025 The Kronos Project. Licensed under the MIT License.”** However, the separate demo repository API reports `license: null` and its checked root directory has no standalone LICENSE. Record both facts: this is a visible MIT declaration, not a separately verified full demo license file. Binance chart-data rights are an additional consideration. The stale signal and unnecessary rights complexity make a demo screenshot/chart a poor default asset.
- **Default cleared-by-design plan:** original paraphrases, simple original numerical illustrations, new diagrams and citations. Do not copy a paper's expressive layout or trace its figures. Avoid platform badges, logos and author photos unless separately necessary and checked.

## Optional static README quotation cards (no screenshot)

These are exact textual selections from S1's pinned README, normalized only for Markdown presentation. They may be typeset in an original card, with quotation marks, source label and MIT notice handling. Prefer original paraphrases if a quote adds no evidentiary value.

1. Introduction, first numbered item: “A specialized tokenizer first quantizes continuous, multi-dimensional K-line data (OHLCV) into **hierarchical discrete tokens**.”
2. Introduction, second numbered item: “A large, autoregressive Transformer is then pre-trained on these tokens, enabling it to serve as a unified model for diverse quantitative tasks.”
3. Fine-tuning disclaimer, opening: “This pipeline is intended as a demonstration to illustrate the finetuning process.”

Credit example: `Kronos README — shiyu-coder/Kronos • MIT • © 2025 ShiYu`; supply the pinned source URL and full license with distributed credits. Do not take the priority claim (“first”) as an established fact simply because the quote is reusable.

## Original visual plan / fact-to-source map

| Card / scene             | Original content, not a screenshot                                                 | Evidence                                      | Required qualifier                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| A: dated identity        | Plain title, authors' institution as text if needed, “Paper v1 • 2 Agustus 2025”   | S3 title/author block; S5 history             | Research from 2025, not a current launch.                                                        |
| B: numerical input       | New six-cell OHLCVA row, values invented for explanation                           | S3 §2; S7 input columns                       | `Ilustrasi data, bukan harga aktual`.                                                            |
| C: pipeline              | New blocks: angka → normalisasi → token kasar/halus → Transformer → angka prediksi | S3 §3; S7, S8                                 | No copied figure layout; “Diagram editorial berdasarkan paper.”                                  |
| D: calendar context      | Original minute/hour/weekday/day/month labels                                      | S7 `calc_time_stamps`; S8 `TemporalEmbedding` | Use minute-of-hour implementation, not paper typo.                                               |
| E: many possible futures | New branching curves drawn from invented values                                    | S3 inference and test-time scaling            | `Ilustrasi kemungkinan, bukan hasil prediksi Kronos`; no invented numerical confidence interval. |
| F: availability          | Original mini/small/base table or base artifact text card                          | S1 Model Zoo; S2 card/API                     | large not public in checked table; current availability differs from v1 lineup.                  |
| G: benchmark caution     | Optional original metric card with reported relative RankIC gain                   | S3 abstract and §4                            | “Dilaporkan peneliti”; not 93% accuracy/profit.                                                  |
| H: closing risk          | Original text on uncertain forecasts, simplified backtests, costs and risk         | S1 disclaimer; S3 simulation                  | Not financial advice or guaranteed returns.                                                      |

Small source-line suggestions: `Sumber: Shi dkk., arXiv:2508.02739v1` and `Sumber: GitHub Kronos / NeoQuasar`. Full URLs belong in published source credits/description as well as this manifest.
