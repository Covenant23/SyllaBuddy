const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function load(file) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const context = { module: { exports: {} } };
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
  return text => context.module.exports.extractItems(text, 2026, '');
}
const original = load('baseline/index_new.original.html');
const corrected = load('index.html');
const timeInput = 'Essay due October 4, 2026\nQuiz TBD\n6 PM';
assert.equal(original(timeInput)[0].time, '18:00');
assert.equal(corrected(timeInput)[0].time, '');
const dateInput = 'Project due February 30, 2026 at 6 PM';
assert.equal(original(dateInput)[0].due, '2026-02-30');
assert.equal(original(dateInput)[0].dflag, '');
assert.equal(corrected(dateInput)[0].due, '');
assert.equal(corrected(dateInput)[0].dflag, 'invalid calendar date');
const ordinary = 'Assignment 1 due October 9, 2026 at 11:59 PM.\nQuiz 1 closes October 12, 2026 at 6 PM.';
assert.equal(JSON.stringify(original(ordinary)), JSON.stringify(corrected(ordinary)));
console.log('Original-versus-corrected extraction checks passed (browser rendering not tested).');
