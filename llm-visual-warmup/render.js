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

  function renderWidget(type) {
    if (type === "attention") {
      return `
        <div class="interactive" data-widget="attention">
          <label for="attention-step">Query token 위치: <span id="attention-step-label">4</span></label>
          <input id="attention-step" type="range" min="1" max="8" value="4">
          <div id="attention-viz" class="viz attention-viz"></div>
        </div>`;
    }
    if (type === "kv-cache") {
      return `
        <div class="interactive" data-widget="kv-cache">
          <label for="kv-step">Decode step: <span id="kv-step-label">5</span></label>
          <input id="kv-step" type="range" min="1" max="8" value="5">
          <div id="kv-viz" class="viz kv-viz"></div>
        </div>`;
    }
    if (type === "vit-patches") {
      return `
        <div class="interactive" data-widget="vit-patches">
          <label for="patch-step">보이는 patch 수: <span id="patch-step-label">8</span></label>
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

        <section class="summary-grid" aria-label="chapter summary">
          <div><strong>왜 지금 배우는지</strong><p>${escapeHtml(chapter.whyNow)}</p></div>
          <div><strong>선행 개념</strong>${chapter.prerequisites && chapter.prerequisites.length ? list(chapter.prerequisites) : "<p>없음. 전체 로드맵에서 시작한다.</p>"}</div>
          <div><strong>학습 목표</strong>${list(chapter.learningGoals)}</div>
        </section>

        <section class="mental-model">
          <h3>Shape / Flow mental model</h3>
          <div class="cards three">
            <article><strong>비유</strong><p>${escapeHtml(chapter.mentalModel.metaphor)}</p></article>
            <article><strong>흐름</strong><p>${escapeHtml(chapter.mentalModel.flow)}</p></article>
            <article><strong>Shape</strong><p>${escapeHtml(chapter.mentalModel.shape)}</p></article>
          </div>
        </section>

        ${renderSections(chapter)}

        <section class="lab-card">
          <h3>Mini lab: ${escapeHtml(chapter.lab.title)}</h3>
          ${list(chapter.lab.steps)}
          <p><strong>기대 인사이트:</strong> ${escapeHtml(chapter.lab.expectedInsight)}</p>
        </section>

        <section class="two-col">
          <div class="note-card warning">
            <h3>초보자 오해</h3>
            ${list(chapter.misconceptions)}
          </div>
          <div class="note-card check">
            <h3>Self-check</h3>
            ${list(chapter.checks)}
          </div>
        </section>

        <section class="source-card">
          <h3>이 장의 출처</h3>
          <ul>${sourceLinks(chapter.sources)}</ul>
        </section>

        ${chapter.id === "checklist-sources" ? `<section id="source-map" class="source-map"><h2>전체 source map</h2>${renderSourceMap()}</section>` : ""}
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
      return `<div class="token ${tokenNumber === step ? "active" : ""}">tok${tokenNumber}</div>`;
    }).join("");
    const scores = Array.from({ length: 8 }, (_, index) => {
      const tokenNumber = index + 1;
      const visible = tokenNumber <= step;
      const value = visible ? (0.18 + (step - tokenNumber + 1) * 0.09).toFixed(2) : "mask";
      return `<div class="score ${visible ? "visible" : "masked"}">${value}</div>`;
    }).join("");
    viz.innerHTML = `<div class="token-row">${tokens}</div><div class="score-row">${scores}</div><p class="mini-caption">Query token ${step}은 ${step}개 token만 볼 수 있고 미래 token은 mask 처리된다.</p>`;
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
    viz.innerHTML = `${cells}<p class="mini-caption" style="grid-column: 1 / -1">현재 cache에는 ${step}개 token의 K/V가 저장되어 있다.</p>`;
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
      return `<div class="patch ${n <= visible ? "visible" : ""}">patch ${n}</div>`;
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
