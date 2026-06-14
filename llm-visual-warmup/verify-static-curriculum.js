#!/usr/bin/env node
/*
 * No-dependency verifier for the AI Study static curriculum app.
 * Run from the repository root with:
 *   node llm-visual-warmup/verify-static-curriculum.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'llm-visual-warmup');
const EXPECTED_IDS = [
  'overview',
  'app-bridge',
  'tensor-shape',
  'autograd-loop',
  'module-state',
  'dataset-loader',
  'token-embedding',
  'attention-mask',
  'multihead-block',
  'tiny-decoder-lm',
  'generation-kv-cache',
  'lora-qlora',
  'data-evaluation',
  'structured-agents-revisit',
  'vision-transformer',
  'multimodal-vlm',
  'on-device-optimization',
  'capstone-map',
  'checklist-sources',
];
const REQUIRED_CHAPTER_KEYS = [
  'id',
  'stage',
  'title',
  'oneLiner',
  'whyNow',
  'learningGoals',
  'sections',
  'lab',
  'misconceptions',
  'checks',
  'sources',
];
const REQUIRED_SOURCE_KEYS = ['label', 'url', 'type', 'note'];
const REQUIRED_MENTAL_MODEL_KEYS = ['conceptNote', 'flow', 'shape'];
const MIN_CHAPTER_TEXT_CHARS = 1100;
const MIN_SECTION_BODY_CHARS = 35;
const MIN_LAB_STEPS = 2;
const VALID_SOURCE_TYPES = new Set(['official', 'university', 'paper', 'supplemental']);
const IMPLEMENTATION_HINT_IDS = new Set([
  'tensor-shape',
  'autograd-loop',
  'module-state',
  'dataset-loader',
  'token-embedding',
  'attention-mask',
  'multihead-block',
  'tiny-decoder-lm',
  'generation-kv-cache',
  'lora-qlora',
  'vision-transformer',
  'on-device-optimization',
]);
const REQUIRED_KOREAN_UI_LABELS = [
  'AI 모델 내부 교안',
  '강의 목차',
  '핵심 포인트',
  '선행 개념',
  '계산 흐름과 shape',
  '확인 실습',
  '스스로 점검하기',
  '참고한 자료',
  '전체 참고 자료',
];
const DISALLOWED_VISIBLE_UI_PHRASES = [
  'AI ' + 'Special' + 'ist Static Curriculum',
  'Lecture outline',
  'Shape / Flow ' + 'mental ' + 'model',
  'Mini ' + 'lab',
  'Self-' + 'check',
  'source map',
  'Query token',
  'Decode step',
];
const DISALLOWED_META_COPY_PATTERNS = [
  /write (a|the) (static )?(website|web page|page)/i,
  /build (a|the) (static )?(website|web page|page)/i,
  /create (a|the) (static )?(website|web page|page)/i,
  new RegExp('pro' + 'mpt\\s*(guide' + 'line|instruction|template)', 'i'),
  new RegExp('system ' + 'pro' + 'mpt', 'i'),
  /as an ai/i,
  new RegExp('follow (these|the) (instructions|guide' + 'lines)', 'i'),
  new RegExp('웹' + '사이트를\\s*(만들|작성|구현)'),
  new RegExp('페이지를\\s*(만들|작성|구현)'),
  new RegExp('프' + '롬프트\\s*(지침|가이드|템플릿)'),
  new RegExp('시스템\\s*' + '프' + '롬프트'),
  new RegExp('다음\\s*지침을\\s*따르'),
  new RegExp('Ess' + 'ential'),
  new RegExp('Special' + 'ist'),
  new RegExp('Sam' + 'sung', 'i'),
  new RegExp('삼' + '성'),
];

let failures = 0;

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function assertCheck(condition, message) {
  if (condition) {
    pass(message);
  } else {
    fail(message);
  }
}

function readRequired(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    fail(`${relativePath} exists`);
    return '';
  }
  const text = fs.readFileSync(absolutePath, 'utf8');
  assertCheck(text.trim().length > 0, `${relativePath} is non-empty`);
  console.log(`INFO ${relativePath} lines=${text.split('\n').length} chars=${text.length}`);
  return text;
}

function flattenText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(flattenText).join('\n');
  if (typeof value === 'object') return Object.values(value).map(flattenText).join('\n');
  return String(value);
}

function validateNoMetaCopy(label, text) {
  for (const pattern of DISALLOWED_META_COPY_PATTERNS) {
    assertCheck(!pattern.test(text), `${label} does not contain service-building meta copy: ${pattern}`);
  }
}

function hasDiagramLikeContent(value) {
  const text = flattenText(value);
  return /→|->|\[[^\]]+\]|shape|flow|흐름|단계|입력|출력|tokens?|tensor|logits|loss|cache|patch/i.test(text);
}

function hasCodeLikeContent(value) {
  if (!value) return false;
  if (typeof value === 'string') {
    return /```|torch\.|nn\.|def |class |for \(|for |=>|const |let |function |pseudo|의사코드|shape/i.test(value);
  }
  if (Array.isArray(value)) return value.some(hasCodeLikeContent);
  if (typeof value === 'object') return Object.values(value).some(hasCodeLikeContent);
  return false;
}

function validateStaticFiles() {
  readRequired('llm-visual-warmup/index.html');
  readRequired('llm-visual-warmup/render.js');
  readRequired('llm-visual-warmup/styles.css');
  const jsFiles = fs.existsSync(APP_DIR)
    ? fs.readdirSync(APP_DIR).filter((file) => file.endsWith('.js')).sort()
    : [];
  assertCheck(jsFiles.length > 0, 'at least one JavaScript file exists in llm-visual-warmup');
  console.log(`INFO js_files=${jsFiles.map((file) => `llm-visual-warmup/${file}`).join(', ') || '(none)'}`);

  for (const file of jsFiles) {
    const relativePath = `llm-visual-warmup/${file}`;
    const result = spawnSync(process.execPath, ['--check', relativePath], { cwd: ROOT, encoding: 'utf8' });
    assertCheck(result.status === 0, `${relativePath} passes node --check syntax`);
    if (result.status !== 0) {
      console.error((result.stderr || result.stdout || '').trim());
    }
  }
}

function loadCurriculum() {
  const curriculumPath = path.join(APP_DIR, 'curriculum.js');
  assertCheck(fs.existsSync(curriculumPath), 'llm-visual-warmup/curriculum.js exists');
  if (!fs.existsSync(curriculumPath)) return null;

  const context = { window: {} };
  vm.createContext(context);
  try {
    vm.runInContext(fs.readFileSync(curriculumPath, 'utf8'), context, { filename: 'curriculum.js' });
  } catch (error) {
    fail(`curriculum.js executes in a browser-like VM (${error.message})`);
    return null;
  }

  const chapters = context.window.AI_STUDY_CURRICULUM;
  assertCheck(Array.isArray(chapters), 'window.AI_STUDY_CURRICULUM is an array');
  return Array.isArray(chapters) ? chapters : null;
}

function validateCurriculum(chapters) {
  if (!chapters) return;

  const ids = chapters.map((chapter) => chapter && chapter.id);
  assertCheck(
    JSON.stringify(ids) === JSON.stringify(EXPECTED_IDS),
    `chapter IDs match fixed v1 inventory (${EXPECTED_IDS.length} chapters)`,
  );

  const seenIds = new Set();
  for (const [index, chapter] of chapters.entries()) {
    const label = chapter && chapter.id ? chapter.id : `chapter[${index}]`;
    if (!chapter || typeof chapter !== 'object') {
      fail(`${label} is an object`);
      continue;
    }

    if (seenIds.has(chapter.id)) fail(`${label} id is unique`);
    seenIds.add(chapter.id);

    for (const key of REQUIRED_CHAPTER_KEYS) {
      assertCheck(Object.prototype.hasOwnProperty.call(chapter, key), `${label} has ${key}`);
    }
    assertCheck(typeof chapter.stage === 'string' && chapter.stage.trim().length > 0, `${label} stage is non-empty`);
    assertCheck(typeof chapter.title === 'string' && chapter.title.trim().length > 0, `${label} title is non-empty`);
    assertCheck(typeof chapter.oneLiner === 'string' && chapter.oneLiner.trim().length > 0, `${label} oneLiner is non-empty`);
    assertCheck(typeof chapter.whyNow === 'string' && chapter.whyNow.trim().length > 0, `${label} whyNow is non-empty`);
    assertCheck(Array.isArray(chapter.learningGoals) && chapter.learningGoals.length >= 2, `${label} has at least 2 learning goals`);
    assertCheck(Array.isArray(chapter.prerequisites), `${label} prerequisites is an array`);
    assertCheck(Array.isArray(chapter.sections) && chapter.sections.length >= 3, `${label} has at least 3 lecture-note sections`);
    assertCheck(chapter.lab && typeof chapter.lab === 'object', `${label} has a lab object`);
    assertCheck(Array.isArray(chapter.misconceptions) && chapter.misconceptions.length >= 1, `${label} has misconceptions`);
    assertCheck(Array.isArray(chapter.checks) && chapter.checks.length >= 3, `${label} has at least 3 check questions`);
    assertCheck(Array.isArray(chapter.sources) && chapter.sources.length >= 2, `${label} has at least 2 sources`);
    assertCheck(flattenText(chapter).length >= MIN_CHAPTER_TEXT_CHARS, `${label} has beginner-depth lesson copy (${MIN_CHAPTER_TEXT_CHARS}+ chars)`);

    validateNoMetaCopy(`${label} visible lesson copy`, flattenText(chapter));

    assertCheck(chapter.mentalModel && typeof chapter.mentalModel === 'object', `${label} has mentalModel diagram data`);
    if (chapter.mentalModel && typeof chapter.mentalModel === 'object') {
      for (const key of REQUIRED_MENTAL_MODEL_KEYS) {
        assertCheck(typeof chapter.mentalModel[key] === 'string' && chapter.mentalModel[key].trim().length > 0, `${label} mentalModel.${key} is non-empty`);
      }
      assertCheck(hasDiagramLikeContent(chapter.mentalModel), `${label} mentalModel contains original flow/shape diagram cues`);
    }

    assertCheck(chapter.lab && Array.isArray(chapter.lab.steps) && chapter.lab.steps.length >= MIN_LAB_STEPS, `${label} lab has at least ${MIN_LAB_STEPS} concrete steps`);
    assertCheck(Boolean(chapter.lab && chapter.lab.expectedInsight), `${label} lab has expectedInsight`);

    if (IMPLEMENTATION_HINT_IDS.has(chapter.id)) {
      assertCheck(hasCodeLikeContent(chapter.sections) || hasCodeLikeContent(chapter.lab), `${label} includes code or pseudo-code guidance`);
    }

    if (Array.isArray(chapter.sections)) {
      chapter.sections.forEach((section, sectionIndex) => {
        assertCheck(section && typeof section === 'object', `${label} section ${sectionIndex + 1} is an object`);
        if (section && typeof section === 'object') {
          assertCheck(Boolean(section.heading), `${label} section ${sectionIndex + 1} has heading`);
          assertCheck(Boolean(section.body || section.bullets || section.code), `${label} section ${sectionIndex + 1} has body, bullets, or code`);
          assertCheck(flattenText(section).length >= MIN_SECTION_BODY_CHARS, `${label} section ${sectionIndex + 1} has lecture-note depth`);
        }
      });
    }

    if (Array.isArray(chapter.sources)) {
      for (const [sourceIndex, source] of chapter.sources.entries()) {
        const sourceLabel = `${label} source ${sourceIndex + 1}`;
        assertCheck(source && typeof source === 'object', `${sourceLabel} is an object`);
        if (!source || typeof source !== 'object') continue;
        for (const key of REQUIRED_SOURCE_KEYS) {
          assertCheck(Boolean(source[key]), `${sourceLabel} has ${key}`);
        }
        assertCheck(VALID_SOURCE_TYPES.has(source.type), `${sourceLabel} has a valid type`);
        assertCheck(/^https?:\/\//.test(source.url || ''), `${sourceLabel} url is absolute HTTP(S)`);
      }
    }
  }
}


function validateDocsContract() {
  const docFiles = ['README.md', 'VERIFICATION.md', 'VALIDATION.md', 'TEACHING-SOURCES.md'];
  for (const file of docFiles) {
    const relativePath = `llm-visual-warmup/${file}`;
    const text = readRequired(relativePath);
    validateNoMetaCopy(relativePath, text);
  }
  const verification = fs.readFileSync(path.join(APP_DIR, 'VERIFICATION.md'), 'utf8');
  assertCheck(verification.includes('node llm-visual-warmup/verify-static-curriculum.js'), 'VERIFICATION.md documents verifier command');
  assertCheck(/node --check/.test(verification), 'VERIFICATION.md documents JS syntax checks');
  assertCheck(/banned-term|금지어|banned context/.test(verification), 'VERIFICATION.md documents banned-term scan');
  assertCheck(/http\.server|curl/.test(verification), 'VERIFICATION.md documents local HTTP smoke');
}

function validateUiContract() {
  const html = readRequired('llm-visual-warmup/index.html');
  const jsFiles = fs.existsSync(APP_DIR)
    ? fs.readdirSync(APP_DIR)
      .filter((file) => file.endsWith('.js'))
      .filter((file) => !/^verify[-.]/.test(file))
      .sort()
    : [];
  const combinedJs = jsFiles
    .map((file) => fs.readFileSync(path.join(APP_DIR, file), 'utf8'))
    .join('\n');

  assertCheck(/AI_STUDY_CURRICULUM/.test(combinedJs), 'renderer consumes AI_STUDY_CURRICULUM');
  assertCheck(/location\.hash|hashchange|replaceState|pushState/.test(combinedJs), 'renderer handles URL hash state');
  assertCheck(/classList\.add\([^)]*active|aria-current|data-active/.test(combinedJs), 'renderer sets a visible active sidebar state');
  assertCheck(/(querySelector|createElement)\([^)]*(toc|sidebar|chapter-list|nav)|\.toc|data-chapter-id/.test(combinedJs), 'renderer targets generated sidebar/navigation');
  assertCheck(/(querySelector|createElement)\([^)]*(chapter|detail|main)|chapter-detail|data-chapter-id/.test(combinedJs), 'renderer targets a chapter detail panel');
  assertCheck(/attention-step|kv-step|patch-step/.test(html + combinedJs), 'attention/KV/ViT widget hooks are present when widgets are shipped');
  assertCheck(/chapter-nav/.test(html) && /data-chapter-id/.test(combinedJs), 'sidebar navigation hook is preserved');
  assertCheck(/location\.hash|hashchange/.test(combinedJs), 'hash navigation hook is preserved');

  const renderJs = fs.readFileSync(path.join(APP_DIR, 'render.js'), 'utf8');
  const styles = fs.readFileSync(path.join(APP_DIR, 'styles.css'), 'utf8');
  const curriculumScriptIndex = html.indexOf('src="./curriculum.js"');
  const renderScriptIndex = html.indexOf('src="./render.js"');
  assertCheck(curriculumScriptIndex >= 0, 'index.html loads curriculum.js');
  assertCheck(renderScriptIndex >= 0, 'index.html loads render.js');
  assertCheck(curriculumScriptIndex >= 0 && renderScriptIndex > curriculumScriptIndex, 'index.html loads curriculum.js before render.js');
  assertCheck(!/<script[^>]+type=["']module["']/i.test(html), 'index.html does not require ES modules');
  assertCheck(/class="diagram"|mental-model|lecture-flow/.test(html + renderJs + styles), 'original no-dependency diagram/flow styling is present');
  assertCheck(/mentalModel\.(flow|shape)|lecture-flow|diagram/.test(renderJs), 'renderer displays curriculum diagram/flow data');
  const visibleUiSource = `${html}\n${renderJs}`;
  for (const label of REQUIRED_KOREAN_UI_LABELS) {
    assertCheck(visibleUiSource.includes(label), `visible UI includes Korean label: ${label}`);
  }
  for (const phrase of DISALLOWED_VISIBLE_UI_PHRASES) {
    assertCheck(!visibleUiSource.includes(phrase), `visible UI avoids awkward English label: ${phrase}`);
  }
  validateNoMetaCopy('static UI files', visibleUiSource);
}

validateStaticFiles();
const chapters = loadCurriculum();
validateCurriculum(chapters);
validateUiContract();
validateDocsContract();

if (failures > 0) {
  console.error(`\nRESULT FAIL ${failures} check(s) failed`);
  process.exit(1);
}

console.log(`\nRESULT PASS validated ${chapters.length} chapters and static UI contract`);
