# Validation Report — Worker 3

Task: Review and document the approved AI study static curriculum expansion.

## Scope reviewed

- Approved PRD: `.omx/plans/prd-ai-study-static-curriculum-20260613T153000Z.md`
- Approved test spec: `.omx/plans/test-spec-ai-study-static-curriculum-20260613T153000Z.md`
- Local static app baseline: `llm-visual-warmup/index.html`, `llm-visual-warmup/script.js`, `llm-visual-warmup/styles.css`
- Documentation added: `README.md`, `TEACHING-SOURCES.md`, this validation report

## Current integration status

The current worker-3 worktree is still the baseline static app. It does not yet contain the v1 implementation files required by the PRD:

- Missing `llm-visual-warmup/curriculum.js`
- Missing `llm-visual-warmup/render.js`
- Existing sidebar is hardcoded anchor navigation, not the required generated active-tab navigation.
- Existing `script.js` queries widget DOM nodes at page load, so it must be refactored or guarded before one-panel rendering is integrated.

These are integration blockers for final v1 acceptance, but they are outside the worker-3 documentation lane unless the leader widens scope.

## Fresh command evidence

Run timestamp: 2026-06-14 KST, from the worker-3 worktree.

### Static inventory

Command:

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
```

Result: PASS

```text
llm-visual-warmup/index.html lines= 649 chars= 24314
llm-visual-warmup/styles.css lines= 726 chars= 10343
js_files= llm-visual-warmup/script.js
```

### JavaScript syntax

Command:

```bash
for f in llm-visual-warmup/*.js; do node --check "$f"; done
```

Result: PASS

```text
llm-visual-warmup/script.js exit=0
```

### Curriculum schema

Command: exact schema check from the approved test spec.

Result: FAIL on current baseline because `curriculum.js` is absent.

```text
Error: ENOENT: no such file or directory, open 'llm-visual-warmup/curriculum.js'
schema_exit=1
```

Expected after integration:

```text
validated 19 chapters
```

### Local server smoke

Command:

```bash
python3 -m http.server 4173 --directory llm-visual-warmup
curl -I --max-time 5 http://127.0.0.1:4173/
```

Result: PASS for baseline static serving.

```text
HTTP/1.0 200 OK
Content-type: text/html
Content-Length: 28507
curl_exit=0
```

## Required final QA after integration

- Schema check prints `validated 19 chapters`.
- `index.html` includes `#chapter-nav` and `#chapter-panel` containers.
- Script order is `curriculum.js` before `render.js`; no `type="module"` for v1.
- Manual hash checks pass for default, valid, and invalid hashes.
- Widget regression checks pass for attention, KV cache, and ViT chapters.
- Source map renders official/university references and all source links are clickable.

## Parallel probe findings integrated

Subagents spawned: 2 (`review-probe` / Locke `019ec1a6-8803-7b62-9a08-cc80a370de25`, `test-probe` / Pauli `019ec1a6-9ffd-77f3-9981-6f8d6bcf4662`).
Subagent model: `gpt-5.4-mini`.
Serial searches before spawn: 0.

### Review probe findings

- Must-fix: `curriculum.js` is missing, so the frozen 19-chapter schema cannot pass.
- Must-fix: current legacy `lectureDetails`/section IDs do not match the approved inventory.
- Must-fix: current UI remains the old anchor-scroll model instead of generated sidebar tabs plus single chapter panel.
- Must-fix: hash routing, active state, invalid-hash fallback, and chapter-scoped source metadata are absent.
- Nice-to-have: add keyboard focus styling for generated sidebar controls.
- Documentation gap addressed in this task: added `README.md`, `TEACHING-SOURCES.md`, and this report.

### Test probe findings

- Existing executable coverage is limited to static file presence, JS syntax, and HTTP serving.
- Required regression checks after implementation are the schema/global check, UI-contract grep, hash/manual QA, and widget lifecycle checks.
- The exact schema validator from the test spec currently fails because `llm-visual-warmup/curriculum.js` is absent.
- Final integration must verify script order (`curriculum.js` before `render.js`), no ES modules, valid/invalid hash behavior, and attention/KV/ViT widget updates after render.

## UI-contract grep for current baseline

Recommended command:

```bash
rg -n "chapter-nav|chapter-panel|AI_STUDY_CURRICULUM|curriculum\\.js|render\\.js|location.hash|hashchange|aria-current|class=\"active\"" llm-visual-warmup
```

Expected after integration: matches in `index.html`, `curriculum.js`, `render.js`, and styles/tests for active state.
Current baseline expectation: no meaningful matches for the required generated-renderer contract.
