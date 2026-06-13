# AI Specialist Static Curriculum

No-dependency static Korean study guide for bridging AI Essential app-building topics into AI Specialist model-internal topics.

## Open locally

```bash
python3 -m http.server 4173 --directory llm-visual-warmup
# open http://127.0.0.1:4173/
```

`index.html` can also be opened directly from the filesystem because the app uses browser globals rather than ES modules.

## Files

- `curriculum.js` — content-only `window.AI_STUDY_CURRICULUM` with exactly 19 fixed v1 chapters.
- `render.js` — sidebar tab rendering, hash routing, single chapter panel rendering, source map, and widget lifecycle.
- `styles.css` — static responsive layout and widget styling.
- `script.js` — legacy placeholder kept side-effect free for static checks.

## Verification

```bash
python3 - <<'PY'
from pathlib import Path
for p in ['llm-visual-warmup/index.html', 'llm-visual-warmup/styles.css']:
    text = Path(p).read_text(encoding='utf-8')
    assert text.strip(), f'{p} is empty'
    print(p, 'lines=', text.count('\n') + 1, 'chars=', len(text))
print('js_files=', ', '.join(str(p) for p in sorted(Path('llm-visual-warmup').glob('*.js'))))
PY
for f in llm-visual-warmup/*.js; do node --check "$f"; done
```

Run the PRD/test-spec curriculum schema check to confirm the exact 19 chapter IDs and source schema.
