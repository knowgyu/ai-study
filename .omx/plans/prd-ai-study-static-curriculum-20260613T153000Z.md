# PRD: AI Study Static Curriculum Expansion

Date: 2026-06-14 KST
Status: Draft for ralplan consensus

## 1. Product intent
Create a personal static web “교안” for AI Specialist preparation. It should not feel like a deployed SaaS product; it should feel like a structured lecture handout that can be opened locally, browsed by chapter, and used to understand concepts through explanation + code + checks.

## 2. Target learner
- Korean-speaking developer who has completed/collected AI Essential materials around Agent, RAG, Structured Output, Multi-agent, LangGraph.
- Wants to bridge from API/framework AI application building into model-internal topics: PyTorch, Transformer, attention, KV cache, LoRA, data/eval, ViT, on-device optimization.
- Beginner-to-intermediate in deep learning internals; needs shape literacy and implementation intuition more than production polish.

## 3. Success criteria
1. Opening `llm-visual-warmup/index.html` locally shows a complete static study guide without installing dependencies.
2. Left sidebar behaves like chapter tabs: selecting a chapter makes that chapter’s detailed lecture guide easy to read immediately, with active state.
3. Each major chapter includes at minimum:
   - 학습 목표
   - 선행 개념 / 왜 지금 배우는지
   - 핵심 설명
   - shape or flow mental model where applicable
   - runnable-looking code snippet or pseudo-lab
   - beginner misconception notes
   - self-check questions
   - source/reference links when based on external facts
4. Content sequence explicitly bridges:
   - AI Essential app-building topics → PyTorch fundamentals → Transformer implementation → inference/fine-tuning/data/eval → vision/on-device/project readiness.
5. Implementation remains token/maintenance efficient: repeated layout is data-driven, not hand-copied for every chapter.
6. Lightweight validation passes: static file syntax/smoke checks and local HTTP serving check.

## 4. Non-goals
- No backend, database, auth, deployment pipeline, analytics, LMS, user accounts.
- No copying long external blog/professor materials verbatim.
- No heavy framework migration unless later requested.
- No requirement to execute PyTorch notebooks inside the web page.

## 5. Current-state diagnosis
Current static app already has a strong base: HTML shell with many concept sections, CSS visual language, JS visual mini-demos, and `lectureDetails` data appended to sections. The main weakness is that content and structure are split awkwardly: base content is hardcoded in HTML while detailed lesson data is in JS and appended under each section. Sidebar currently anchors-scroll rather than functioning as a focused chapter-detail navigator. This makes adding larger 교안 content possible but increasingly token-expensive and hard to maintain.

## 6. Recommended architecture decision
Choose **Option B: no-dependency data-driven static lesson app**.

### Option A: keep current HTML sections and append more JS details
Pros: smallest code diff; low risk. Cons: duplicates content between HTML and JS; sidebar remains anchor-scroll; long HTML becomes token-heavy.

### Option B: data-driven static app with `curriculum.js` + reusable renderer — chosen
Pros: most token-efficient; chapters can be expanded by editing structured data; sidebar tabs and detail panel are straightforward; no build tooling. Cons: one-time restructuring of current hardcoded content.

### Option C: migrate to React/Vite/MDX
Pros: scalable authoring, components, markdown content. Cons: adds dependencies/build complexity contrary to “교안, not web service”; overkill for current repo.

## 7. Content architecture
Use a compact chapter schema:

```js
{
  id,
  stage,           // prerequisite | core | implementation | advanced | project
  title,
  oneLiner,
  whyNow,
  prerequisites: [],
  learningGoals: [],
  mentalModel: { metaphor, flow, shape },
  sections: [{ heading, body, code?, bullets? }],
  lab: { title, steps, expectedInsight },
  misconceptions: [],
  checks: [],
  next: [],
  sources: []
}
```

Renderer responsibilities:
- Generate sidebar from chapter data.
- Maintain active chapter by click and hash.
- Render detail panel from one chapter at a time to reduce DOM clutter.
- Preserve interactive demos for attention, KV cache, ViT as small reusable widgets.
- Optionally render progress/checklist using localStorage, but keep optional.

## 8. Recommended curriculum sequence
### Phase 0 — Orientation / Bridge
0. 전체 지도: Essential에서 Specialist로 넘어가는 관점
1. AI Essential 복습 bridge: Agent/RAG/LangGraph가 모델 내부와 만나는 지점

### Phase 1 — PyTorch foundations
2. Tensor와 shape literacy
3. Autograd와 training loop
4. nn.Module/state_dict/train-eval
5. Dataset/DataLoader/collate/split

### Phase 2 — Transformer from implementation view
6. Tokenization/embedding/position
7. Scaled dot-product attention and masks
8. Multi-head attention + Transformer block
9. Tiny decoder LM training loop
10. Generation, sampling, KV cache

### Phase 3 — Adaptation, data, evaluation
11. Fine-tuning vs instruction tuning vs LoRA/QLoRA
12. Data quality, RAG evaluation, regression set
13. Structured output/tool agents revisited as evaluation/application layer

### Phase 4 — Vision and on-device
14. CNN-to-ViT bridge and patch embedding
15. Multimodal/CLIP/VLM intuition
16. On-device optimization: latency/memory/quantization/export

### Phase 5 — Capstone readiness
17. Mini-project map: tiny transformer, RAG eval lab, on-device compression lab
18. Pre-class checklist and source map

## 9. External evidence incorporated
- PyTorch official Learn the Basics includes current DataLoader/Dataset guidance and learning sequence for tensors/autograd/model/optimization/save-load.
- PyTorch SDPA tutorial supports teaching attention both naïvely and via optimized fused path.
- Hugging Face KV cache docs support distinguishing Dynamic/Static/Quantized cache and generation-only context.
- Hugging Face PEFT LoRA docs support LoRA/adapter/merge content.
- Stanford CS224N/CS231n support implementation-heavy pedagogy: build neural network models and train/fine-tune via assignments/projects.
- ExecuTorch and ONNX Runtime docs support on-device/export/quantization chapters.

## 10. Team execution plan
Use `$team` after consensus, but account for no git repo.

Recommended staffing if using one shared role type:
- `omx team 3:executor "Implement the approved AI study static curriculum expansion plan in llm-visual-warmup with one content lane, one UI/render lane, and one verification lane. Preserve no-dependency static app. Follow .omx/plans/prd-ai-study-static-curriculum-20260613T153000Z.md and test-spec-ai-study-static-curriculum-20260613T153000Z.md."`

Better if manual task assignment after team launch:
- Worker 1 Content: expand curriculum data and sources.
- Worker 2 UI/Renderer: sidebar tabs, active state, data-driven render, responsive style.
- Worker 3 Verification/Integration: static checks, local server smoke, link/source coverage.

Pre-team note: because the folder is not a git repository, the selected execution path is to initialize a local git repository and create a Lore-compliant baseline commit before launching team. Team then launches without `--worktree` for the first pass and uses disjoint write scopes.

## 11. Acceptance criteria for implementation handoff
- Files changed are limited to `llm-visual-warmup/*` plus optional documentation files.
- No dependency install required.
- Sidebar chapter click changes active chapter/detail panel; hash deep link works.
- Existing attention/KV/ViT demos still render.
- Exactly 19 fixed v1 chapters with beginner-friendly content and checks.
- Source list includes official/university references.
- Static validation commands pass.

---

## 12. Revision 1 — Architect ITERATE fixes

### 12.1 Frozen final chapter inventory
Implementation MUST deliver exactly these 19 chapter IDs in this order for the first team pass:

| # | id | title | phase | mandatory purpose |
|---:|---|---|---|---|
| 0 | `overview` | 전체 지도: Essential에서 Specialist로 | Orientation | 전체 학습 지도와 목표 정의 |
| 1 | `essential-bridge` | Essential 복습 bridge: Agent/RAG/LangGraph와 모델 내부 | Orientation | 기존 자료와 새 교안 연결 |
| 2 | `tensor-shape` | Tensor와 shape literacy | PyTorch foundations | 모든 구현 챕터의 선행조건 |
| 3 | `autograd-loop` | Autograd와 training loop | PyTorch foundations | 학습 루프 이해 |
| 4 | `module-state` | nn.Module, state_dict, train/eval | PyTorch foundations | 모델 구조 계약 이해 |
| 5 | `dataset-loader` | Dataset/DataLoader/collate/split | PyTorch foundations | 데이터 공급 계약 이해 |
| 6 | `token-embedding` | Tokenization, embedding, position | Transformer implementation | 텍스트가 모델 입력이 되는 과정 |
| 7 | `attention-mask` | Scaled dot-product attention과 causal mask | Transformer implementation | attention 핵심 수식/shape |
| 8 | `multihead-block` | Multi-head attention과 Transformer block | Transformer implementation | block 조립 감각 |
| 9 | `tiny-decoder-lm` | Tiny decoder LM training loop | Transformer implementation | end-to-end 구현 감각 |
| 10 | `generation-kv-cache` | Generation, sampling, KV cache | Inference | 학습과 추론 최적화 분리 |
| 11 | `lora-qlora` | Fine-tuning, LoRA, QLoRA, adapter merge | Adaptation | PEFT/메모리 제약 이해 |
| 12 | `data-evaluation` | Data quality, RAG evaluation, regression set | Data/eval | 현업 성능 측정 구조 |
| 13 | `structured-agents-revisit` | Structured output/tool agents 재방문 | Application bridge | Essential 주제를 평가/제품 레이어로 재배치 |
| 14 | `vision-transformer` | CNN-to-ViT bridge와 patch embedding | Vision | 이미지 tokenization 이해 |
| 15 | `multimodal-vlm` | CLIP/VLM 직관과 멀티모달 연결 | Vision/multimodal | 언어-비전 연결 감각 |
| 16 | `on-device-optimization` | On-device 최적화: latency/memory/quantization/export | Optimization | 삼성/디바이스 맥락 핵심 |
| 17 | `capstone-map` | Mini-project map: tiny transformer/RAG eval/on-device lab | Capstone | 학습을 프로젝트로 전환 |
| 18 | `checklist-sources` | 수업 전 체크리스트와 source map | Wrap-up | 복습/출처/다음 행동 |

V1 acceptance requires **exactly 19 chapters** in this fixed order. Future chapters can be added later through the same schema, but v1 verification checks this fixed inventory.

### 12.2 Locked UI contract
The app MUST become a **true active sidebar tab + single chapter detail panel** app:

- Sidebar is generated from the 19-chapter curriculum data.
- Clicking a sidebar item does not navigate to a long static section; it sets one active chapter and renders only that chapter’s detail panel in the main content area.
- URL hash updates to `#<chapter-id>` on selection.
- Loading with an existing hash opens that chapter; invalid hash falls back to `overview`.
- Active state is visible in the sidebar.
- Existing visual widgets for attention, KV cache, and ViT may be embedded into relevant chapter render sections or preserved as reusable widget blocks.
- The old all-sections anchor-scroll model should not remain the primary UX. It can remain only as a graceful no-JS fallback if cheap.

### 12.3 Team execution decision under non-git constraint
The selected team path is:

1. Before launching `$team`, the leader checks whether `.git/` exists.
2. If absent, the leader initializes a local git repository and creates a baseline commit:
   ```bash
   git init
   git add .
   git commit -F - <<'MSG'
Preserve a reversible baseline for team implementation

Constraint: Team worker integration assumes git history for safe shared edits.
Confidence: high
Scope-risk: narrow
Directive: Do not rewrite this baseline unless the entire local repo is intentionally reset.
Tested: Static files inventoried before implementation.
Not-tested: No application behavior changed by this baseline commit.
MSG
   ```
   This is required because team worker commit/integration assumptions depend on git. The baseline commit message above is Lore-compliant and should be used as-is unless execution evidence changes the `Tested`/`Not-tested` trailers.
3. Launch team without worktrees for the first pass unless the runtime requires otherwise, but assign disjoint write scopes to reduce conflict:
   - Worker 1 Content data: `llm-visual-warmup/curriculum.js`, source ledger content only.
   - Worker 2 UI/render/styles: `llm-visual-warmup/index.html`, `llm-visual-warmup/render.js`, `llm-visual-warmup/styles.css`.
   - Worker 3 Verification/docs: `llm-visual-warmup/README.md`, `llm-visual-warmup/TEACHING-SOURCES.md`, validation report; no implementation edits unless asked by leader.
4. Workers must not revert other workers’ changes and must report shared-file needs before editing outside their assigned scope.

### 12.4 Source/citation policy
- Every chapter has a `sources` array.
- Any current/version/tooling claim must cite an official/upstream or university source where possible.
- Third-party blogs are allowed only as optional intuition aids and must be labeled supplemental.
- Source objects use this schema:
  ```js
  { label, url, type: 'official' | 'university' | 'paper' | 'supplemental', note }
  ```
- A central rendered source map groups sources by chapter and by type.


---

## 13. Revision 2 — Critic ITERATE fixes

### 13.1 Exact static data/render contract
Implementation MUST use browser globals, not ES modules, so `index.html` can be opened directly from the filesystem as well as served over `http.server`.

Required files and ownership:
- `llm-visual-warmup/curriculum.js`
  - Owns content only.
  - Defines exactly one global:
    ```js
    window.AI_STUDY_CURRICULUM = [/* exactly 19 chapter objects */];
    ```
  - No DOM mutation in this file.
- `llm-visual-warmup/render.js`
  - Reads `window.AI_STUDY_CURRICULUM`.
  - Renders sidebar tabs into `#chapter-nav`.
  - Renders active chapter into `#chapter-panel`.
  - Renders source map into `#source-map` or a source section inside `#chapter-panel` for `checklist-sources`.
  - Owns hash routing, active state, invalid-hash fallback, and widget lifecycle.
- `llm-visual-warmup/script.js`
  - May be deleted, folded into `render.js`, or kept only for pure widget helpers.
  - If kept, it must not assume widget DOM nodes exist at page load.

Required `index.html` script order:
```html
<script src="./curriculum.js"></script>
<script src="./render.js"></script>
```
No `type="module"` in v1.

Required containers in `index.html`:
```html
<nav id="chapter-nav" class="toc" aria-label="Lecture outline"></nav>
<main class="doc">
  <section id="chapter-panel" class="chapter-panel" aria-live="polite"></section>
</main>
```

### 13.2 Widget lifecycle contract
Because the app renders one active chapter at a time, visual widgets must be initialized after the active chapter DOM is rendered.

Required behavior:
- Renderer calls `initChapterWidgets(activeChapterId)` after each chapter render.
- Widget code uses null guards for all DOM queries.
- Widget markup may live inside chapter section data with `widget: 'attention' | 'kv-cache' | 'vit-patches'`.
- `attention-mask` initializes the attention widget.
- `generation-kv-cache` initializes the KV cache widget.
- `vision-transformer` initializes the ViT patch widget.
- If a chapter without widgets is active, `initChapterWidgets` exits without error.

### 13.3 Concrete verification command for curriculum schema
The implementation MUST support this exact validation command:

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

### 13.4 Revised execution acceptance
All acceptance/test language is now: **exactly 19 fixed v1 chapters**. Any implementation producing fewer/more chapters or reordered IDs fails v1, even if the content is otherwise good.
