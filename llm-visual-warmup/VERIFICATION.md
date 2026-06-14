# AI Study Static Curriculum Verification

This folder intentionally stays no-dependency. Run the checks from the repository root.

## Syntax/static smoke

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

## PRD/test-spec contract

```bash
node llm-visual-warmup/verify-static-curriculum.js
```

The verifier enforces the approved v1 contract:

- `window.AI_STUDY_CURRICULUM` is exposed by `llm-visual-warmup/curriculum.js` without ES modules.
- The fixed 19 chapter IDs match the PRD order exactly.
- Every chapter has required schema fields, goals, sections, lab, misconceptions, checks, and source metadata.
- Implementation-oriented chapters include code or pseudo-code guidance.
- Renderer code consumes curriculum data, handles hash state, sets visible active navigation state, and keeps attention/KV/ViT widget hooks available when shipped.

Expected on the pre-implementation baseline: failure, because `curriculum.js` and the data-driven renderer contract are not present yet.
Expected after Worker 1/UI-content integration: `RESULT PASS validated 19 chapters and static UI contract`.

## Local server smoke

```bash
cd llm-visual-warmup
python3 -m http.server 4173
```

Manual QA targets from the test spec: `overview`, `app-bridge`, `tensor-shape`, `attention-mask`, `generation-kv-cache`, `lora-qlora`, `vision-transformer`, `on-device-optimization`, `capstone-map`.

Expected integrated behavior: sidebar active state changes, one chapter detail panel renders, hash updates, invalid hashes fall back to `overview`, and responsive layout remains usable.
