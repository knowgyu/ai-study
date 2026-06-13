#!/usr/bin/env node
/*
 * No-dependency verifier for the AI Study static curriculum app.
 * Run from the repository root with:
 *   node llm-visual-warmup/verify-static-curriculum.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'llm-visual-warmup');
const EXPECTED_IDS = [
  'overview',
  'essential-bridge',
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
  readRequired('llm-visual-warmup/styles.css');
  const jsFiles = fs.existsSync(APP_DIR)
    ? fs.readdirSync(APP_DIR).filter((file) => file.endsWith('.js')).sort()
    : [];
  assertCheck(jsFiles.length > 0, 'at least one JavaScript file exists in llm-visual-warmup');
  console.log(`INFO js_files=${jsFiles.map((file) => `llm-visual-warmup/${file}`).join(', ') || '(none)'}`);
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
    assertCheck(Array.isArray(chapter.sections) && chapter.sections.length >= 2, `${label} has at least 2 sections`);
    assertCheck(chapter.lab && typeof chapter.lab === 'object', `${label} has a lab object`);
    assertCheck(Array.isArray(chapter.misconceptions) && chapter.misconceptions.length >= 1, `${label} has misconceptions`);
    assertCheck(Array.isArray(chapter.checks) && chapter.checks.length >= 2, `${label} has at least 2 self-checks`);
    assertCheck(Array.isArray(chapter.sources) && chapter.sources.length >= 1, `${label} has at least 1 source`);

    if (IMPLEMENTATION_HINT_IDS.has(chapter.id)) {
      assertCheck(hasCodeLikeContent(chapter.sections) || hasCodeLikeContent(chapter.lab), `${label} includes code or pseudo-code guidance`);
    }

    if (Array.isArray(chapter.sections)) {
      chapter.sections.forEach((section, sectionIndex) => {
        assertCheck(section && typeof section === 'object', `${label} section ${sectionIndex + 1} is an object`);
        if (section && typeof section === 'object') {
          assertCheck(Boolean(section.heading), `${label} section ${sectionIndex + 1} has heading`);
          assertCheck(Boolean(section.body || section.bullets || section.code), `${label} section ${sectionIndex + 1} has body, bullets, or code`);
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

function validateUiContract() {
  const html = readRequired('llm-visual-warmup/index.html');
  const jsFiles = fs.existsSync(APP_DIR)
    ? fs.readdirSync(APP_DIR).filter((file) => file.endsWith('.js')).sort()
    : [];
  const combinedJs = jsFiles
    .map((file) => fs.readFileSync(path.join(APP_DIR, file), 'utf8'))
    .join('\n');

  assertCheck(/AI_STUDY_CURRICULUM/.test(combinedJs), 'renderer consumes AI_STUDY_CURRICULUM');
  assertCheck(/location\.hash|hashchange|replaceState|pushState/.test(combinedJs), 'renderer handles URL hash state');
  assertCheck(/classList\.add\([^)]*active|aria-current|data-active/.test(combinedJs), 'renderer sets a visible active sidebar state');
  assertCheck(/querySelector\([^)]*(toc|sidebar|chapter-list|nav)/.test(combinedJs), 'renderer targets generated sidebar/navigation');
  assertCheck(/querySelector\([^)]*(chapter|detail|main)/.test(combinedJs), 'renderer targets a chapter detail panel');
  assertCheck(/attention-step|kv-step|patch-step/.test(html + combinedJs), 'attention/KV/ViT widget hooks are present when widgets are shipped');
}

validateStaticFiles();
const chapters = loadCurriculum();
validateCurriculum(chapters);
validateUiContract();

if (failures > 0) {
  console.error(`\nRESULT FAIL ${failures} check(s) failed`);
  process.exit(1);
}

console.log(`\nRESULT PASS validated ${chapters.length} chapters and static UI contract`);
