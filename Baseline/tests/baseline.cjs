const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const context = { module: { exports: {} } };
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
const { extractItems } = context.module.exports;
const extract = text => extractItems(text, 2026, '');

const stale = extract('Essay due October 4, 2026\nQuiz TBD\n6 PM');
assert.equal(stale[0].time, '');
assert.equal(stale[1].time, '');
assert.equal(extract('Essay due October 4, 2026\n6 PM')[0].time, '18:00');
assert.equal(extract('Essay due October 4, 2026\nItem\n6 PM')[0].time, '');
assert.equal(extract('Essay due October 4, 2026\nAll quizzes close at 6 PM\n8 PM')[0].time, '');

for (const date of ['February 30, 2026', 'April 31, 2026', 'February 29, 2026', '0 August 2026', '32 August 2026']) {
  const item = extract(`Project due ${date} at 6 PM`)[0];
  assert.equal(item.due, '', date);
  assert.equal(item.dflag, 'invalid calendar date', date);
}
assert.equal(extract('Project due February 29, 2028 at 6 PM')[0].due, '2028-02-29');
assert.equal(extract('Project due October 4, 2026 at 1.30pm')[0].time, '13:30');
assert.equal(extract('Project\tOctober 4, 2026\t11:59 PM')[0].time, '23:59');
assert.equal(extract('All assignments are due Sundays at 11:59 PM.\nQuiz 1 due October 4, 2026')[0].time, '23:59');
assert.match(extract('Project due Monday October 4, 2026 at 6 PM')[0].dflag, /weekday/);
assert.equal(extract('Session 1\nTopic\nFebruary 30, 2026\nReadings:\n- Chapter 1')[0].due, '');
console.log('Baseline regression checks passed.');
