# AI Model Internals Static Curriculum

No-dependency static Korean study guide for moving from AI app-layer topics into model-internal topics: tensors, autograd, modules, data loading, Transformer attention, generation caches, LoRA, vision models, and deployment constraints.

## Open locally

```bash
python3 -m http.server 4173 --directory llm-visual-warmup
# open http://127.0.0.1:4173/
```

`index.html` can also be opened directly from the filesystem because the app uses browser globals rather than ES modules.

## Files

- `curriculum.js` — content-only `window.AI_STUDY_CURRICULUM` with exactly 19 fixed v1 chapters and per-chapter source metadata.
- `render.js` — sidebar tab rendering, hash routing, single chapter panel rendering, source map, and widget lifecycle.
- `styles.css` — static responsive layout, diagram/flow cards, and widget styling.
- `script.js` — legacy placeholder kept side-effect free for static checks.
- `verify-static-curriculum.js` — no-dependency verifier for schema depth, diagram/flow fields, banned-context copy, JS syntax, and UI contract.

## Verification

Run from the repository root:

```bash
for f in llm-visual-warmup/*.js; do node --check "$f"; done
node llm-visual-warmup/verify-static-curriculum.js
rg -n "Ess''ential|Spec''ialist|Sam''sung|삼''성|as an a''i|웹''사이트를|페''이지를" llm-visual-warmup \
  --glob '!verify-static-curriculum.js'
python3 -m http.server 4173 --directory llm-visual-warmup >/tmp/llm-visual-warmup-http.log 2>&1 &
server_pid=$!
curl -fsSI --max-time 5 http://127.0.0.1:4173/
kill "$server_pid"
```

The `rg` command should produce no matches. The verifier should end with `RESULT PASS validated 19 chapters and static UI contract`.
