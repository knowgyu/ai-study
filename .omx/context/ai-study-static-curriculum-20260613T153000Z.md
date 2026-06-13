# Context Snapshot: AI Study Static Curriculum Expansion

Timestamp: 2026-06-14 KST / 2026-06-13 UTC
Mode: ralplan planning only; no implementation edits yet.

## Task statement
현재 `/home/knowgyu/workspace/ai-study`의 공부용 AI 자료와 `llm-visual-warmup` 정적 웹 교안을 파악하고, 웹 서비스 배포가 아닌 개인 학습용 정적 교안 앱으로 내용을 확장한다. 좌측 사이드탭에서 챕터를 누르면 해당 챕터의 자세한 교안이 보이도록 만들고, 초보자도 개념을 확실히 습득할 수 있게 선행/후행 지식, 코드 구현 감각, 실습/데모, 체크 질문을 추가한다. 최신 정보와 공식 문서/교수 교안/블로그성 교육 자료를 재료로 하되 토큰 효율적인 구조를 설계한다. 사용자는 `$ralplan`으로 계획 후 `$team`으로 작업하는 방향을 선호했다.

## Desired outcome
- 정적 웹으로 바로 열어 볼 수 있는 교안 앱.
- 사이드바 챕터 클릭 시 상세 교안 패널이 전환/표시되는 학습 UX.
- 챕터별 초보자 친화 설명, 코드 구현 예시, shape/흐름도, 실습 또는 즉시 확인 가능한 데모, 체크 질문.
- 기존 자료(`AI Essential` 노트북, 로드맵 markdown, 현재 `llm-visual-warmup`)를 보존/활용.
- 팀 실행 전 명확한 PRD, 테스트 명세, 작업 분할.

## Repo-local facts / evidence
- 현재 작업 경로는 git repository가 아님: `git status`가 `fatal: not a git repository`를 반환.
- package.json/vite/next 등 빌드 도구가 없음. 현재 앱은 plain HTML/CSS/JS 정적 페이지.
- 앱 파일:
  - `llm-visual-warmup/index.html`: 649 lines, 정적 섹션/사이드바 anchor 기반 TOC. 제목은 `AI Specialist Preview Notes`.
  - `llm-visual-warmup/script.js`: 488 lines. `lectureDetails` 배열이 챕터 상세 교안 데이터를 들고, `renderLectureDetails()`가 각 section 뒤에 상세 교안을 append. attention/KV/ViT 미니 시각화도 포함.
  - `llm-visual-warmup/styles.css`: 726 lines. 300px sticky sidebar + card/chapter/lecture-detail 스타일.
- 현재 챕터 흐름: overview, PyTorch map, tensor, autograd, module, data-loader, transformer, attention, generation, lora, data, vit, on-device, checklist, sources.
- 현재 UX는 좌측 링크 클릭 시 같은 페이지 anchor scroll. 사용자가 말한 “좌측 사이드탭 누르면 그 챕터에 대해 자세한 교안”에 더 맞추려면 tab/panel 방식 또는 anchor + active detail panel로 개선 필요.
- `AI Essential/Day1` 노트북은 LangChain Agent, Multi-agent/Sub-agent, Structured Output, Agentic RAG, LangGraph Basic 자료를 포함한다. Specialist 대비 교안은 기존 Essential 활용 능력에서 PyTorch/Transformer/최적화/평가로 이어지는 bridge를 명시해야 한다.
- `ai-specialist-study-roadmap.md`, `ai-specialist-expected-curriculum.md`, `samsung-ai-specialist.md`는 이미 예상 범위와 로드맵을 정리해 둔 상태.

## External evidence / source-backed facts
- PyTorch Tutorials 2.12.0+cu130 Datasets & DataLoaders page: Last Updated 2026-05-07. Dataset/DataLoader를 모델 훈련 코드와 데이터 처리 코드를 분리하는 primitive로 설명하고, Dataset은 sample/label 저장, DataLoader는 iterable access를 제공한다고 설명한다. URL: https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html
- PyTorch SDPA tutorial: PyTorch `scaled_dot_product_attention`는 Q/K/V 사이 scaled dot product attention을 계산하며, fused implementation이 naive implementation 대비 큰 성능 이점을 줄 수 있다고 설명한다. URL: https://docs.pytorch.org/tutorials/intermediate/scaled_dot_product_attention_tutorial.html
- Hugging Face Transformers KV cache docs: Dynamic/Static/Quantized cache 등 cache class와 generation 용도를 설명하며, DynamicCache is default, StaticCache supports torch.compile but higher memory, QuantizedCache lower memory. URL: https://huggingface.co/docs/transformers/en/kv_cache
- Hugging Face PEFT LoRA docs: LoRA는 trainable parameter 수를 줄여 large model finetuning을 빠르게 하고 memory를 줄이는 low-rank decomposition method라고 설명한다. merge_and_unload로 inference latency 이슈를 줄일 수도 있다. URL: https://huggingface.co/docs/peft/en/developer_guides/lora
- Stanford CS224N: NLP/LLM course는 PyTorch로 neural network models를 design, implement, understand하는 역량을 목표로 한다. URL: https://web.stanford.edu/class/cs224n/
- Stanford CS231n: computer vision course는 end-to-end deep learning architectures, hands-on assignments, train/fine-tune engineering tricks를 강조한다. URL: https://cs231n.stanford.edu/
- ExecuTorch 1.3 docs: PyTorch의 on-device/edge inference solution으로 mobile phones부터 embedded systems까지 효율적 inference를 목표로 하며 CPU/GPU/NPU/DSP acceleration과 profiling/debugging tooling을 제공한다. URL: https://docs.pytorch.org/executorch/stable/index.html
- ONNX Runtime quantization docs: 32-bit floating point model을 8-bit integer model로 변환하는 Python APIs, dynamic/static quantization, debugging, transformer-based model에 dynamic quantization 추천 등을 설명한다. URL: https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html

## Constraints
- 사용자는 배포용 웹서비스가 아니라 개인 학습용 “교안”을 원함.
- 토큰 효율: 거대한 중복 HTML보다 schema-driven curriculum data + reusable render template이 적합.
- 현재 빌드 체인이 없으므로 우선 no-dependency static app 유지가 안전.
- 외부 자료는 출처를 남기되 저작권상 장문 복붙 금지. 요약/재구성 중심.
- Team 실행은 tmux runtime 사용 가능하지만 현재 폴더가 git repo가 아니라 worker commit/worktree 관례와 충돌 가능. Team launch 전에 git init 여부 또는 no-worktree/direct shared edit 방식을 계획에 명시해야 함.

## Unknowns / open questions
- 실제 AI Specialist 최신 내부 커리큘럼은 공개 자료만으로 확정 불가. 계획은 “현 로컬 자료 + 공개 자료 기반 대비 교안”으로 한정.
- 사용자가 원하는 난이도/챕터 수는 더 늘릴 수 있지만, 1차 실행은 현재 14개 챕터를 확장하고 bridge 챕터를 추가하는 것이 안전.
- 팀 실행 시 git init을 할지 여부. 자동으로 시작해도 되지만, 이 계획 단계에서는 리스크로 표시한다.

## Likely touchpoints for execution
- `llm-visual-warmup/index.html`: shell 구조, sidebar/nav container, main content root, source note.
- `llm-visual-warmup/script.js`: curriculum data 분리/확장, render functions, tab behavior, search/filter/progress optional.
- `llm-visual-warmup/styles.css`: tab state, lesson layout, code/diagram/cards, responsive behavior.
- Optional new files: `llm-visual-warmup/curriculum.js`, `llm-visual-warmup/render.js`, `llm-visual-warmup/README.md`, `llm-visual-warmup/TEACHING-SOURCES.md`.

## Planning stop condition
Ralplan is complete only after PRD/test-spec exist and Architect then Critic both approve, with a durable handoff record persisted.

## Ralplan revision 1 notes
Architect requested iteration on final chapter inventory, UI contract, team git path, smoke command, and source policy. PRD/test-spec were revised to freeze exactly 19 chapter IDs, choose true active-tab single-panel rendering, require local git initialization before team if `.git` is absent, replace invalid `/dev/null` py_compile smoke check, and require per-chapter sources.
