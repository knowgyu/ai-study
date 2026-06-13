# Test Spec: AI Study Static Curriculum Expansion

Date: 2026-06-14 KST
Status: Revision 2 for ralplan consensus

## 1. Test goals
Prove that the result is a working no-dependency static study guide and that the content/UX matches the PRD.

## 2. Static checks
Run from `/home/knowgyu/workspace/ai-study`:

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

## 3. Curriculum schema/content check
The implementation MUST expose curriculum data as `window.AI_STUDY_CURRICULUM` from `llm-visual-warmup/curriculum.js` with no ES module requirement. Run:

```bash
node - <<'NODE'
const fs = require('fs');
const vm = require('vm');
const expected = [
  'overview', 'essential-bridge', 'tensor-shape', 'autograd-loop',
  'module-state', 'dataset-loader', 'token-embedding', 'attention-mask',
  'multihead-block', 'tiny-decoder-lm', 'generation-kv-cache', 'lora-qlora',
  'data-evaluation', 'structured-agents-revisit', 'vision-transformer',
  'multimodal-vlm', 'on-device-optimization', 'capstone-map', 'checklist-sources'
];
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('llm-visual-warmup/curriculum.js', 'utf8'), context);
const chapters = context.window.AI_STUDY_CURRICULUM;
if (!Array.isArray(chapters)) throw new Error('AI_STUDY_CURRICULUM must be an array');
const ids = chapters.map((chapter) => chapter.id);
if (JSON.stringify(ids) !== JSON.stringify(expected)) {
  throw new Error(`chapter IDs mismatch\nexpected=${expected.join(',')}\nactual=${ids.join(',')}`);
}
const required = ['id', 'stage', 'title', 'oneLiner', 'whyNow', 'learningGoals', 'sections', 'lab', 'misconceptions', 'checks', 'sources'];
const sourceTypes = new Set(['official', 'university', 'paper', 'supplemental']);
for (const chapter of chapters) {
  for (const key of required) {
    if (!(key in chapter)) throw new Error(`${chapter.id} missing ${key}`);
  }
  if (!Array.isArray(chapter.learningGoals) || chapter.learningGoals.length < 2) throw new Error(`${chapter.id} needs learning goals`);
  if (!Array.isArray(chapter.sections) || chapter.sections.length < 2) throw new Error(`${chapter.id} needs sections`);
  if (!Array.isArray(chapter.misconceptions) || chapter.misconceptions.length < 1) throw new Error(`${chapter.id} needs misconceptions`);
  if (!Array.isArray(chapter.checks) || chapter.checks.length < 2) throw new Error(`${chapter.id} needs checks`);
  if (!Array.isArray(chapter.sources) || chapter.sources.length < 1) throw new Error(`${chapter.id} needs sources`);
  for (const source of chapter.sources) {
    for (const key of ['label', 'url', 'type', 'note']) {
      if (!source[key]) throw new Error(`${chapter.id} source missing ${key}`);
    }
    if (!sourceTypes.has(source.type)) throw new Error(`${chapter.id} invalid source type ${source.type}`);
  }
}
console.log(`validated ${chapters.length} chapters`);
NODE
```

Expected: `validated 19 chapters`.

## 4. Local server smoke
```bash
cd llm-visual-warmup
python3 -m http.server 4173
# then open http://127.0.0.1:4173/ manually or use browser/screenshot if available
```

Expected:
- Page loads without console errors.
- Sidebar visible and generated from 19 chapters.
- `overview` detail renders by default.
- Existing visual widgets render either in relevant chapters or as reusable demo sections.

## 5. Functional manual QA
- Click these sidebar items: `overview`, `essential-bridge`, `tensor-shape`, `attention-mask`, `generation-kv-cache`, `lora-qlora`, `vision-transformer`, `on-device-optimization`, `capstone-map`.
- Expected: active state changes; one active chapter detail panel renders; URL hash updates; no full page reload required.
- Reload with `#attention-mask`; expected: attention chapter opens.
- Reload with invalid hash; expected: fallback to `overview`.
- At mobile width or browser responsive mode: sidebar stacks above content and chapter selection remains usable.

## 6. Content QA rubric
For every chapter in the curriculum data:
- Has beginner-friendly explanation and Korean prose.
- Has at least one code or pseudo-code snippet when the topic is implementation-oriented.
- Has at least one beginner misconception and at least two self-check questions.
- If chapter makes current-tool/version claims, it has a source URL.
- Code blocks are short and illustrative; no huge copied notebooks.
- Phase ordering makes sense: prerequisites appear before advanced topics.

## 7. Regression checks
- Attention range input still updates visible/masked tokens if the widget exists in the final UI.
- KV cache range input still updates K/V cells if the widget exists in the final UI.
- ViT patch range input still updates patch grid if the widget exists in the final UI.
- Source links remain clickable.

## 8. Team verification path
- Worker verification lane reports:
  - JS syntax check outputs.
  - curriculum schema check output.
  - local server start command result.
  - manual QA notes for at least 9 chapters listed in section 5.
  - list of content chapters and missing-source exceptions, if any.
- Leader integrates and performs final smoke check before shutdown.

## 9. Known gaps
- Without a browser automation package, visual QA may be manual unless using available screenshot/browser tools.
- PyTorch snippets are pedagogical; they are not all executed in the static app.
