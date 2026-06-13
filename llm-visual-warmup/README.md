# AI Specialist Preview Notes

A no-dependency static Korean study guide for bridging AI Essential app-building topics into AI Specialist model-internals preparation.

## Intended v1 contract

The approved v1 curriculum is a data-driven static lecture handout:

- Open `index.html` directly from the filesystem or through a local HTTP server.
- Load browser globals in this order:
  1. `curriculum.js` defines `window.AI_STUDY_CURRICULUM`.
  2. `render.js` reads that data and renders the UI.
- Generate the sidebar from exactly 19 fixed chapters.
- Render one active chapter at a time in `#chapter-panel`.
- Update the URL hash on chapter selection; invalid hashes fall back to `#overview`.
- Keep visual widgets reusable and initialize them after each chapter render.

## Expected files

```text
llm-visual-warmup/
├── index.html              # static shell and required containers
├── styles.css              # responsive lecture-handout styles
├── curriculum.js           # content-only global curriculum data
├── render.js               # sidebar/detail/source rendering and hash routing
├── README.md               # this usage/integration guide
├── TEACHING-SOURCES.md     # source ledger for curriculum claims
└── VALIDATION.md           # worker verification notes and commands
```

`script.js` may remain only if it contains widget helpers with null guards. It must not assume widget DOM nodes exist at page load because v1 renders one chapter at a time.

## Fixed chapter inventory

V1 must expose exactly these chapter IDs, in this order:

1. `overview`
2. `essential-bridge`
3. `tensor-shape`
4. `autograd-loop`
5. `module-state`
6. `dataset-loader`
7. `token-embedding`
8. `attention-mask`
9. `multihead-block`
10. `tiny-decoder-lm`
11. `generation-kv-cache`
12. `lora-qlora`
13. `data-evaluation`
14. `structured-agents-revisit`
15. `vision-transformer`
16. `multimodal-vlm`
17. `on-device-optimization`
18. `capstone-map`
19. `checklist-sources`

## Local usage

Filesystem mode:

```bash
open llm-visual-warmup/index.html
```

HTTP smoke mode:

```bash
cd llm-visual-warmup
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

## Validation commands

Run from the repository root:

```bash
python3 - <<'PY'
from pathlib import Path
required = [
    'llm-visual-warmup/index.html',
    'llm-visual-warmup/styles.css',
]
for p in required:
    text = Path(p).read_text(encoding='utf-8')
    assert text.strip(), f'{p} is empty'
    print(p, 'lines=', text.count('\n') + 1, 'chars=', len(text))

js_files = sorted(Path('llm-visual-warmup').glob('*.js'))
assert js_files, 'expected at least one JS file'
print('js_files=', ', '.join(str(p) for p in js_files))
PY
for f in llm-visual-warmup/*.js; do node --check "$f"; done
```

Then run the schema command from `.omx/plans/test-spec-ai-study-static-curriculum-20260613T153000Z.md`; expected output after integration is:

```text
validated 19 chapters
```

## Manual QA checklist

After content and renderer integration:

- Load with no hash; `overview` is active.
- Click `overview`, `essential-bridge`, `tensor-shape`, `attention-mask`, `generation-kv-cache`, `lora-qlora`, `vision-transformer`, `on-device-optimization`, and `capstone-map`.
- Confirm active sidebar state, single chapter panel rendering, and hash updates.
- Reload with `#attention-mask`; the attention chapter opens.
- Reload with an invalid hash; the app falls back to `overview`.
- At mobile width, the sidebar remains usable above or beside the chapter panel.
- If present, attention/KV-cache/ViT widgets update after their range inputs move.
