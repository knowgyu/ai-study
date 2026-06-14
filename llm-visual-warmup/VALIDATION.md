# Validation Report — Static Curriculum

## Scope

This report covers the no-dependency curriculum app in `llm-visual-warmup/` and the verifier/docs lane for the 19-chapter model-internals curriculum.

## Current integration status

The app now has the expected data-driven structure:

- `curriculum.js` exposes `window.AI_STUDY_CURRICULUM` with the fixed 19 chapter IDs.
- `render.js` builds sidebar navigation, a single chapter panel, hash routing, source links, and chapter-scoped widgets.
- `styles.css` contains responsive layout, diagram/flow cards, and widget styles.
- `verify-static-curriculum.js` enforces content depth, diagram/flow fields, banned context/meta copy, JS syntax, source metadata, and UI contract checks.

## Required final QA

Run these commands from the repository root before publishing:

```bash
for f in llm-visual-warmup/*.js; do node --check "$f"; done
node llm-visual-warmup/verify-static-curriculum.js
rg -n "Ess''ential|Spec''ialist|Sam''sung|삼''성|pro''mpt guideline|system pro''mpt|as an a''i|웹''사이트를|페''이지를|프''롬프트" llm-visual-warmup \
  --glob '!verify-static-curriculum.js'
python3 -m http.server 4173 --directory llm-visual-warmup >/tmp/llm-visual-warmup-http.log 2>&1 &
server_pid=$!
curl -fsSI --max-time 5 http://127.0.0.1:4173/
kill "$server_pid"
```

Expected results:

- JS syntax: PASS for every `.js` file.
- Verifier: `RESULT PASS validated 19 chapters and static UI contract`.
- Banned-term scan: no matches outside the verifier implementation file.
- HTTP smoke: HTTP 200 headers for `/`.

## Manual smoke checklist

- Default load renders `overview`.
- A valid hash such as `#attention-mask` renders that chapter and marks its sidebar item active.
- An invalid hash falls back to `overview`.
- Attention, KV cache, and ViT chapter widgets update when their range controls move.
- Source links open as normal external links and the final source-map chapter lists all chapter sources.
