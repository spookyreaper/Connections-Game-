const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {} };
for (const file of ['puzzles.js', 'puzzles-medium.js', 'puzzles-hard.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const levels = {
    easy: context.window.CONNECTION_PUZZLES,
    medium: context.window.CONNECTION_MEDIUM_PUZZLES,
    hard: context.window.CONNECTION_CHALLENGE_PUZZLES.hard,
    expert: context.window.CONNECTION_CHALLENGE_PUZZLES.expert,
};

const boards = Object.values(levels).flat();

test('the collection retains over 1,000 distinct playable words', () => {
    const words = boards.flatMap(puzzle => puzzle.flatMap(group => group.words));
    assert.ok(new Set(words).size > 1000);
    const boardSignatures = boards.map(puzzle => puzzle.flatMap(group => group.words).sort().join(','));
    assert.equal(new Set(boardSignatures).size, boards.length, 'Each board should offer a different set of words');
    assert.ok(levels.easy.length >= 65);
    for (const level of ['medium', 'hard', 'expert']) {
        assert.ok(levels[level].length >= 8, `${level} needs a varied selection of boards`);
    }
});

test('every board has 16 distinct words and four complete groups', () => {
    for (const [level, puzzles] of Object.entries(levels)) {
        for (const [index, puzzle] of puzzles.entries()) {
            const label = `${level} puzzle ${index + 1}`;
            assert.equal(puzzle.length, 4, label);
            assert.equal(new Set(puzzle.flatMap(group => group.words)).size, 16, label);
            assert.equal(new Set(puzzle.map(group => group.category)).size, 4, label);
            assert.equal(new Set(puzzle.map(group => group.difficulty)).size, 4, label);
            for (const group of puzzle) {
                assert.ok(group.category.trim(), label);
                assert.ok(Number.isInteger(group.difficulty) && group.difficulty >= 1 && group.difficulty <= 4, label);
                assert.equal(group.words.length, 4, `${label}: ${group.category}`);
                for (const word of group.words) {
                    assert.match(word, /^[A-Z]{1,10}$/, `${label}: ${word}`);
                }
            }
        }
    }
});

test('higher levels include more explained wordplay connections', () => {
    const indirect = new Set(['phrase', 'spelling', 'sound']);
    for (const [level, minimum] of Object.entries({ medium: 1, hard: 2, expert: 3 })) {
        for (const [index, puzzle] of levels[level].entries()) {
            const label = `${level} puzzle ${index + 1}`;
            assert.ok(puzzle.filter(group => indirect.has(group.mechanic)).length >= minimum, label);
            for (const group of puzzle) {
                assert.ok(group.mechanic === 'meaning' || indirect.has(group.mechanic), `${label}: ${group.category}`);
                if (indirect.has(group.mechanic)) {
                    assert.ok(typeof group.explanation === 'string' && group.explanation.trim(), `${label}: ${group.category} needs an explanation`);
                }
            }
        }
    }
});
