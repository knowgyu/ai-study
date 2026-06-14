(function () {
  const chapters = window.AI_STUDY_CURRICULUM || [];
  const nav = document.querySelector("#chapter-nav");
  const panel = document.querySelector("#chapter-panel");
  const validIds = new Set(chapters.map((chapter) => chapter.id));

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeHash() {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return validIds.has(id) ? id : "overview";
  }

  function list(items) {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function codeBlock(code) {
    return code ? `<pre><code>${escapeHtml(code)}</code></pre>` : "";
  }

  function sourceList(sources) {
    return list((sources || []).map((source) => `${source.label} (${source.type}) — ${source.note}`));
  }

  function sourceLinks(sources) {
    return (sources || []).map((source) => `
      <li>
        <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>
        <span class="source-type">${escapeHtml(source.type)}</span>
        <p>${escapeHtml(source.note)}</p>
      </li>
    `).join("");
  }


  const diagrams = {
    overview: {
      title: "전체 학습 지도",
      caption: "앱 호출 경험에서 시작해 tensor, Transformer, 추론 최적화, 튜닝, Vision, 배포 점검으로 이어진다.",
      steps: ["앱 호출", "Tensor", "Transformer", "추론/튜닝", "Vision/배포"],
    },
    "autograd-loop": {
      title: "학습 루프와 autograd",
      caption: "forward로 loss를 만들고, backward가 gradient를 채운 뒤 optimizer가 파라미터를 한 번 갱신한다.",
      steps: ["batch", "forward", "loss", "backward", "optimizer.step"],
    },
    "dataset-loader": {
      title: "Dataset과 DataLoader 경계",
      caption: "Dataset은 샘플 하나를 정의하고 DataLoader는 shuffle, batch, collate를 거쳐 모델 입력 묶음을 만든다.",
      steps: ["files/rows", "Dataset.__getitem__", "shuffle", "collate", "batch [B,...]"],
    },
    "token-embedding": {
      title: "Token에서 embedding까지",
      caption: "문자열은 token id가 되고, embedding table 조회 후 position 정보가 더해져 [B,T,C] 표현이 된다.",
      steps: ["text", "token ids [B,T]", "embedding lookup", "+ position", "hidden [B,T,C]"],
    },
    "attention-mask": {
      title: "Q/K/V attention 흐름",
      caption: "Q는 무엇을 찾는지, K는 어디에 있는지, V는 가져올 내용을 나타내며 causal mask가 미래 token을 막는다.",
      steps: ["hidden x", "linear → Q K V", "QKᵀ / √D", "+ mask", "softmax · V"],
    },
    "multihead-block": {
      title: "Transformer block 한 층",
      caption: "LayerNorm, residual, attention, MLP가 반복되며 token별 hidden vector를 조금씩 갱신한다.",
      steps: ["x", "LN + MHA", "residual", "LN + MLP", "residual out"],
    },
    "generation-kv-cache": {
      title: "KV cache로 줄어드는 반복 계산",
      caption: "이미 생성한 token의 K/V를 저장하면 다음 token에서는 새 Q와 캐시된 K/V만 조합한다.",
      steps: ["cached K/V", "new token Q", "read cache", "append K/V", "next logits"],
    },
    "lora-qlora": {
      title: "LoRA adapter 구조",
      caption: "큰 base weight는 고정하고 작은 A/B adapter만 학습해 적은 파라미터로 task 변화를 더한다.",
      steps: ["frozen W", "down A", "up B", "scaled ΔW", "W + ΔW"],
    },
    "vision-transformer": {
      title: "ViT patch 처리",
      caption: "이미지를 작은 patch로 자르고 각 patch를 token처럼 embedding해 Transformer에 넣는다.",
      steps: ["image", "patch grid", "patch embeddings", "+ CLS/position", "Transformer"],
    },
    "data-evaluation": {
      title: "평가 루프",
      caption: "고정된 test set과 metric으로 모델 출력을 기록해 회귀와 실제 개선을 구분한다.",
      steps: ["eval data", "model output", "metric", "error slice", "fix decision"],
    },
    "capstone-map": {
      title: "최종 점검 연결도",
      caption: "학습, 추론, 데이터, 평가, 배포 제약을 한 장의 의사결정 흐름으로 연결한다.",
      steps: ["goal", "data", "train/tune", "evaluate", "deploy"],
    },
  };

  function renderDiagram(chapterId) {
    const diagram = diagrams[chapterId];
    if (!diagram) return "";
    const width = 900;
    const height = 210;
    const gap = 22;
    const boxWidth = 132;
    const boxHeight = 56;
    const startX = 34;
    const y = 68;
    const boxes = diagram.steps.map((step, index) => {
      const x = startX + index * (boxWidth + gap);
      const arrow = index < diagram.steps.length - 1
        ? `<path class="diagram-arrow" d="M ${x + boxWidth + 6} ${y + boxHeight / 2} H ${x + boxWidth + gap - 8}" marker-end="url(#arrow-${chapterId})"/>`
        : "";
      return `
        <g class="diagram-node" transform="translate(${x} ${y})">
          <rect width="${boxWidth}" height="${boxHeight}" rx="12"></rect>
          <text x="${boxWidth / 2}" y="${boxHeight / 2 + 5}" text-anchor="middle">${escapeHtml(step)}</text>
        </g>
        ${arrow}`;
    }).join("");
    return `
      <section class="diagram-card" aria-labelledby="diagram-title-${escapeHtml(chapterId)}">
        <div class="diagram-copy">
          <h3 id="diagram-title-${escapeHtml(chapterId)}">${escapeHtml(diagram.title)}</h3>
          <p>${escapeHtml(diagram.caption)}</p>
        </div>
        <svg class="flow-diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(diagram.title)}">
          <defs>
            <marker id="arrow-${escapeHtml(chapterId)}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z"></path>
            </marker>
          </defs>
          <rect class="diagram-bg" x="10" y="16" width="880" height="178" rx="18"></rect>
          ${boxes}
        </svg>
      </section>`;
  }

  function renderWidget(type) {
    if (type === "attention") {
      return `
        <div class="interactive" data-widget="attention">
          <label for="attention-step">조회 토큰 위치: <span id="attention-step-label">4</span></label>
          <input id="attention-step" type="range" min="1" max="8" value="4">
          <div id="attention-viz" class="viz attention-viz"></div>
        </div>`;
    }
    if (type === "kv-cache") {
      return `
        <div class="interactive" data-widget="kv-cache">
          <label for="kv-step">생성 단계: <span id="kv-step-label">5</span></label>
          <input id="kv-step" type="range" min="1" max="8" value="5">
          <div id="kv-viz" class="viz kv-viz"></div>
        </div>`;
    }
    if (type === "vit-patches") {
      return `
        <div class="interactive" data-widget="vit-patches">
          <label for="patch-step">표시할 패치 수: <span id="patch-step-label">8</span></label>
          <input id="patch-step" type="range" min="1" max="16" value="8">
          <div id="vit-viz" class="viz vit-viz"></div>
        </div>`;
    }
    return "";
  }

  function renderSections(chapter) {
    return chapter.sections.map((section) => `
      <article class="lesson-section">
        <h3>${escapeHtml(section.heading)}</h3>
        <p>${escapeHtml(section.body)}</p>
        ${list(section.bullets)}
        ${codeBlock(section.code)}
        ${renderWidget(section.widget)}
      </article>
    `).join("");
  }

  function renderSourceMap() {
    return chapters.map((chapter) => `
      <article class="source-chapter">
        <h3>${escapeHtml(chapter.title)}</h3>
        <ul>${sourceLinks(chapter.sources)}</ul>
      </article>
    `).join("");
  }

  function renderNav(activeId) {
    if (!nav) return;
    nav.innerHTML = chapters.map((chapter, index) => `
      <a href="#${escapeHtml(chapter.id)}" class="${chapter.id === activeId ? "active" : ""}" data-chapter-id="${escapeHtml(chapter.id)}" aria-current="${chapter.id === activeId ? "page" : "false"}">
        <span>${index}</span>${escapeHtml(chapter.title)}
      </a>
    `).join("");
  }

  function renderChapter(id) {
    const chapter = chapters.find((item) => item.id === id) || chapters[0];
    if (!chapter || !panel) return;
    renderNav(chapter.id);
    panel.innerHTML = `
      <article class="chapter-card" data-active-chapter="${escapeHtml(chapter.id)}">
        <header class="chapter-hero">
          <p class="eyebrow">${escapeHtml(chapter.stage)}</p>
          <h2>${escapeHtml(chapter.title)}</h2>
          <p class="lead">${escapeHtml(chapter.oneLiner)}</p>
        </header>

        <section class="summary-grid" aria-label="장 요약">
          <div><strong>핵심 포인트</strong><p>${escapeHtml(chapter.whyNow)}</p></div>
          <div><strong>선행 개념</strong>${chapter.prerequisites && chapter.prerequisites.length ? list(chapter.prerequisites) : "<p>없음</p>"}</div>
        </section>

        <section class="mental-model">
          <h3>계산 흐름과 shape</h3>
          <div class="cards two">
            <article><strong>처리 흐름</strong><p>${escapeHtml(chapter.mentalModel.flow)}</p></article>
            <article><strong>주요 shape</strong><p>${escapeHtml(chapter.mentalModel.shape)}</p></article>
          </div>
        </section>

        ${renderDiagram(chapter.id)}

        ${renderSections(chapter)}

        <section class="lab-card">
          <h3>확인 실습: ${escapeHtml(chapter.lab.title)}</h3>
          ${list(chapter.lab.steps)}
          <p><strong>확인 포인트:</strong> ${escapeHtml(chapter.lab.expectedInsight)}</p>
        </section>

        <section class="two-col">
          <div class="note-card warning">
            <h3>자주 하는 오해</h3>
            ${list(chapter.misconceptions)}
          </div>
          <div class="note-card check">
            <h3>스스로 점검하기</h3>
            ${list(chapter.checks)}
          </div>
        </section>

        <section class="source-card">
          <h3>참고한 자료</h3>
          <ul>${sourceLinks(chapter.sources)}</ul>
        </section>

        ${chapter.id === "checklist-sources" ? `<section id="source-map" class="source-map"><h2>전체 참고 자료</h2>${renderSourceMap()}</section>` : ""}
      </article>
    `;
    initChapterWidgets(chapter.id);
  }

  function selectChapter(id, pushHash) {
    const target = validIds.has(id) ? id : "overview";
    if (pushHash && window.location.hash !== `#${target}`) {
      history.pushState(null, "", `#${target}`);
    }
    renderChapter(target);
  }

  function renderAttention() {
    const stepInput = document.querySelector("#attention-step");
    const label = document.querySelector("#attention-step-label");
    const viz = document.querySelector("#attention-viz");
    if (!stepInput || !viz) return;
    const step = Number(stepInput.value);
    if (label) label.textContent = String(step);
    const tokens = Array.from({ length: 8 }, (_, index) => {
      const tokenNumber = index + 1;
      return `<div class="token ${tokenNumber === step ? "active" : ""}">토큰${tokenNumber}</div>`;
    }).join("");
    const scores = Array.from({ length: 8 }, (_, index) => {
      const tokenNumber = index + 1;
      const visible = tokenNumber <= step;
      const value = visible ? (0.18 + (step - tokenNumber + 1) * 0.09).toFixed(2) : "가림";
      return `<div class="score ${visible ? "visible" : "masked"}">${value}</div>`;
    }).join("");
    viz.innerHTML = `<div class="token-row">${tokens}</div><div class="score-row">${scores}</div><p class="mini-caption">조회 토큰 ${step}은 앞의 ${step}개 토큰만 볼 수 있고, 이후 토큰은 가려진다.</p>`;
  }

  function renderKv() {
    const stepInput = document.querySelector("#kv-step");
    const label = document.querySelector("#kv-step-label");
    const viz = document.querySelector("#kv-viz");
    if (!stepInput || !viz) return;
    const step = Number(stepInput.value);
    if (label) label.textContent = String(step);
    const cells = Array.from({ length: step }, (_, index) => {
      const n = index + 1;
      return `<div class="cache-cell k">K${n}</div><div class="cache-cell v">V${n}</div>`;
    }).join("");
    viz.innerHTML = `${cells}<p class="mini-caption" style="grid-column: 1 / -1">현재 캐시에는 ${step}개 토큰의 K/V가 저장되어 있다.</p>`;
  }

  function renderVit() {
    const stepInput = document.querySelector("#patch-step");
    const label = document.querySelector("#patch-step-label");
    const viz = document.querySelector("#vit-viz");
    if (!stepInput || !viz) return;
    const visible = Number(stepInput.value);
    if (label) label.textContent = String(visible);
    viz.innerHTML = Array.from({ length: 16 }, (_, index) => {
      const n = index + 1;
      return `<div class="patch ${n <= visible ? "visible" : ""}">패치 ${n}</div>`;
    }).join("");
  }

  window.initChapterWidgets = function initChapterWidgets(activeChapterId) {
    if (activeChapterId === "attention-mask") {
      const input = document.querySelector("#attention-step");
      if (input) input.addEventListener("input", renderAttention);
      renderAttention();
      return;
    }
    if (activeChapterId === "generation-kv-cache") {
      const input = document.querySelector("#kv-step");
      if (input) input.addEventListener("input", renderKv);
      renderKv();
      return;
    }
    if (activeChapterId === "vision-transformer") {
      const input = document.querySelector("#patch-step");
      if (input) input.addEventListener("input", renderVit);
      renderVit();
    }
  };

  if (nav) {
    nav.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-chapter-id]");
      if (!link) return;
      event.preventDefault();
      selectChapter(link.dataset.chapterId, true);
    });
  }

  window.addEventListener("hashchange", () => selectChapter(normalizeHash(), false));
  selectChapter(normalizeHash(), false);
})();
