import fs from 'node:fs';

const constants = fs.readFileSync('constants.ts', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');
const welcome = fs.readFileSync('components/WelcomeView.tsx', 'utf8');
const exportView = fs.readFileSync('components/ExportView.tsx', 'utf8');
const combined = [constants, readme, welcome, exportView].join('\n');
const failures = [];

const dayMatches = [...constants.matchAll(/day: (\d+), week:/g)];
if (dayMatches.length !== 10) failures.push('expected 10 days, found ' + dayMatches.length);

const dayIds = dayMatches.map((match) => Number(match[1]));
if (new Set(dayIds).size !== 10 || Math.min(...dayIds) !== 1 || Math.max(...dayIds) !== 10) {
  failures.push('day numbers must be unique and cover 1 through 10');
}

for (const required of [
  'Understanding Mindsets',
  'Affective Labeling',
  'Cognitive Scripts',
  'Decision Clarity',
  'Self-Anthropology',
  'Aligning with Purpose',
  'Managing Emotional Triggers',
  'Complex Life Scenarios',
  'Mapping a Conscious Life',
  'Living with Intention',
  'Week 1 Checkpoint',
  'Week 2 Checkpoint',
  'FINAL_REFLECTION_PROMPT',
  'Purpose Map',
  'Before & After',
  'Finding Meaning and Balance'
]) {
  if (!combined.includes(required)) failures.push('required Part 3 content missing: ' + required);
}

const frameworkMatches = [...constants.matchAll(/frameworkName: '([^']+)'/g)].map((match) => match[1]);
if (new Set(frameworkMatches).size !== frameworkMatches.length) {
  failures.push('duplicate named frameworks remain inside Part 3');
}

for (const forbidden of [
  'GET YOUR THINK ON',
  'GEMINI_API_KEY',
  'process.env.API_KEY',
  'PART 3: EXPLORING IDEAS AND MAKING MOVES',
  'PART 3: BUILDING CLARITY AND CONFIDENCE'
]) {
  if (combined.includes(forbidden)) failures.push('forbidden legacy, internal-only, incorrect-title, or secret-boundary phrase found: ' + forbidden);
}

for (const day of Array.from({ length: 10 }, (_, index) => index + 1)) {
  const coreIds = ['d' + day + '-map', 'd' + day + '-p1', 'd' + day + '-p2', 'd' + day + '-p3'];
  for (const id of coreIds) {
    if (!constants.includes("id: '" + id + "'")) failures.push('missing core prompt ' + id);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS Part 3 curriculum, de-duplication, conformity, public-firewall, and secret-boundary validation');
