import { chromium } from 'playwright';

const BASE = process.env.CTJ_BASE ?? 'http://127.0.0.1:4173';
const results = [];

function record(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log((pass ? 'PASS  ' : 'FAIL  ') + name + (detail ? ' [' + detail + ']' : ''));
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => pageErrors.push(String(error)));

await page.goto(BASE);
record('Part 3 welcome renders', await page.getByRole('heading', { name: 'Finding Meaning and Balance' }).isVisible());

await page.getByTestId('begin-part3').click();
record('Day view opens', await page.getByTestId('day-view').isVisible());

const dayTitles = [
  'Understanding Mindsets',
  'Affective Labeling',
  'Cognitive Scripts',
  'Decision Clarity',
  'Self-Anthropology',
  'Aligning with Purpose',
  'Managing Emotional Triggers',
  'Complex Life Scenarios',
  'Mapping a Conscious Life',
  'Living with Intention'
];

for (let day = 1; day <= 10; day += 1) {
  record('Day ' + day + ' heading renders', await page.getByRole('heading', { name: dayTitles[day - 1] }).isVisible());

  const coreIds = ['d' + day + '-map', 'd' + day + '-p1', 'd' + day + '-p2', 'd' + day + '-p3'];
  for (const id of coreIds) {
    await page.getByTestId('response-' + id).fill(
      'Day ' + day + ' response for ' + id + ': I define the hypothesis, evidence, alternative explanation, action, result, and what would make me revise the next move.'
    );
  }

  record('Day ' + day + ' enables continue after core session', await page.getByTestId('day-continue').isEnabled());
  await page.getByTestId('day-continue').click();

  if (day === 5 || day === 10) {
    record('Checkpoint after Day ' + day + ' renders', await page.getByTestId('checkpoint-view').isVisible());
    await page.getByTestId('checkpoint-response').fill(
      'Checkpoint after Day ' + day + ': the most useful change is treating action as a source of evidence, keeping tests bounded, and revising the next move when results differ from the expectation.'
    );
    record('Checkpoint after Day ' + day + ' enables continue', await page.getByTestId('checkpoint-continue').isEnabled());
    await page.getByTestId('checkpoint-continue').click();
  }
}

record('Final reflection renders after Day 10 checkpoint', await page.getByTestId('final-view').isVisible());

await page.getByTestId('final-reflection').fill(
  'My biggest Part 3 insight is that useful movement comes from small experiments that create evidence, reveal assumptions, and make the next decision more informed.'
);

record('Final reflection enables completion', await page.getByTestId('final-continue').isEnabled());
await page.getByTestId('final-continue').click();

record('Export view renders', await page.getByTestId('export-view').isVisible());
record('PDF export is offered', await page.getByTestId('export-pdf').isVisible());
record('JSON export is offered', await page.getByTestId('export-json').isVisible());
record('TXT export is offered', await page.getByTestId('export-txt').isVisible());

const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ctj.part3.state.v2') || '{}'));
record('Ten completed days persist locally', stored.completedDays?.length === 10, 'count=' + (stored.completedDays?.length ?? 0));
record('Two checkpoints persist locally', stored.completedCheckpoints?.length === 2, 'count=' + (stored.completedCheckpoints?.length ?? 0));
record('Core responses persist locally', stored.responses && Object.keys(stored.responses).length >= 42, 'count=' + Object.keys(stored.responses ?? {}).length);
record('Final reflection persists locally', typeof stored.finalReflection === 'string' && stored.finalReflection.length > 40);

await page.reload();
record('Export state survives reload', await page.getByTestId('export-view').isVisible());

const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
record('Desktop has no material horizontal overflow', desktopOverflow <= 1, desktopOverflow + 'px');

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobile.newPage();
await mobilePage.goto(BASE);

const mobileOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
record('Mobile has no material horizontal overflow', mobileOverflow <= 1, mobileOverflow + 'px');
record('Mobile welcome renders', await mobilePage.getByRole('heading', { name: 'Finding Meaning and Balance' }).isVisible());

await mobile.close();

record('No material console errors', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
record('No uncaught page errors', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '));

await browser.close();

const failed = results.filter((result) => !result.pass);
console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
if (failed.length) process.exit(1);
