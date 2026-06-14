# AI Study Static Curriculum Verification

This folder intentionally stays no-dependency. Run the checks from the repository root.

## 1. JavaScript syntax

```bash
for f in llm-visual-warmup/*.js; do node --check "$f"; done
```

Expected: every JavaScript file exits with status 0. The verifier also runs `node --check` internally for every `.js` file in this folder.

## 2. Curriculum and UI contract

```bash
node llm-visual-warmup/verify-static-curriculum.js
```

The verifier enforces the v1 contract:

- `window.AI_STUDY_CURRICULUM` is exposed by `llm-visual-warmup/curriculum.js` without ES modules.
- The fixed 19 chapter IDs match the approved order exactly.
- Every chapter has required schema fields, prerequisites, goals, at least three lecture-note sections, a concrete lab, misconceptions, at least three check questions, and at least two sources.
- Every chapter includes `mentalModel.conceptNote`, `mentalModel.flow`, and `mentalModel.shape` so the rendered lesson has original no-dependency diagram/flow support.
- Implementation-oriented chapters include code or pseudo-code guidance.
- Visible lesson/UI/docs copy avoids banned context/meta terms and 서비스 제작 메타 문구.
- `index.html` loads `curriculum.js` before `render.js`, does not require ES modules, and preserves `#chapter-nav` / `#chapter-panel` hooks.
- Renderer code consumes curriculum data, handles hash state, sets visible active navigation state, renders diagram/flow data, and keeps attention/KV/ViT widget hooks available.

Expected integrated result:

```text
RESULT PASS validated 19 chapters and static UI contract
```

## 3. Banned-term scan

```bash
rg -n "Ess''ential|Spec''ialist|Sam''sung|삼''성|as an a''i|웹''사이트를|페''이지를" llm-visual-warmup \
  --glob '!verify-static-curriculum.js'
```

Expected: no matches. The verifier stores the banned patterns in split strings where needed so the scan can ignore the verifier implementation file itself.

## 4. Local HTTP smoke

```bash
python3 -m http.server 4173 --directory llm-visual-warmup >/tmp/llm-visual-warmup-http.log 2>&1 &
server_pid=$!
curl -fsSI --max-time 5 http://127.0.0.1:4173/
kill "$server_pid"
```

Expected: HTTP 200 headers for `/`.

Manual QA targets: `overview`, `app-bridge`, `tensor-shape`, `attention-mask`, `generation-kv-cache`, `lora-qlora`, `vision-transformer`, `on-device-optimization`, `capstone-map`.

Expected behavior: sidebar active state changes, one chapter detail panel renders, hash updates, invalid hashes fall back to `overview`, source links render, and the attention/KV/ViT widgets update after render.
