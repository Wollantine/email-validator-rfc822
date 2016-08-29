var test = require('tape');
var populate = require('sequential-data-provider');
var validator = require('../src/validate');

const strictEmailValidationTestBattery = [
    ['email', 'expected', 'description'],
    ['jon.snow@gmail.com', true, 'A usual email should be accepted'],
    ['jon.snow@winterfell.castle', true, 'A valid email should be accepted'],
    [' jonsnow@winterfell.castle ', false, 'A non-trimmed email should be rejected'],
    ['jon@', false, 'Email without domain should be rejected'],
    ['jon@.winterfell', false, 'Domain without name should be rejected'],
    ['jon@winterfell.', false, 'Domain without extension should be rejected'],
    ['jon@.', false, 'Domain without name or extension should be rejected'],
    ['jon@winterfell', false, 'Domain without dot should be rejected'],
    ['@enabl.es', false, 'Email without address should be rejected'],
    ['', false, 'Empty emails should be rejected'],
    ['jon snow@winterfell.castle', false, 'Emails containing spaces should be rejected'],
    ['"Jon@Snow"@winterfell.castle', true, 'A complex but valid email as per RFC822 should be accepted'],
    ['"Jon Snow"@winterfell.castle', true, 'A complex but valid email as per RFC822 should be accepted'],
    ['.snow@winterfell.castle', false, 'Edge case not allowed by RFC822 should be rejected'],
    ['Jon..Snow@winterfell.castle', false, 'Another edge case not allowed by RFC822 should be rejected']
];

const looseEmailValidationTestBattery = [
    ['email', 'expected', 'description'],
    ['jon.snow@gmail.com', true, 'A usual email should be accepted'],
    ['jon.snow@winterfell.castle', true, 'A valid email should be accepted'],
    [' jonsnow@winterfell.castle ', false, 'A non-trimmed email should be rejected'],
    ['jon@', false, 'Email without domain should be rejected'],
    ['jon@.winterfell', false, 'Domain without name should be rejected'],
    ['jon@winterfell.', false, 'Domain without extension should be rejected'],
    ['jon@.', false, 'Domain without name or extension should be rejected'],
    ['jon@winterfell', true, 'Domain without dot should be accepted'],
    ['@enabl.es', false, 'Email without address should be rejected'],
    ['', false, 'Empty emails should be rejected'],
    ['jon snow@winterfell.castle', false, 'Emails containing spaces should be rejected'],
    ['"Jon@Snow"@winterfell.castle', false, 'A complex but valid email as per RFC822 should be rejected'],
    ['"Jon Snow"@winterfell.castle', false, 'A complex but valid email as per RFC822 should be rejected'],
    ['.snow@winterfell.castle', true, 'Edge case not allowed by RFC822 should be accepted'],
    ['Jon..Snow@winterfell.castle', true, 'Another edge case not allowed by RFC822 should be accepted']
];

var strictlyValid = validator.strictlyValid,
    looselyValid = validator.looselyValid;

test("Strict Validator", (assert) => {
    populate(strictEmailValidationTestBattery, (data) => {
       assert.equal(strictlyValid(data.email), data.expected, data.description)
    });

    assert.end();
});

test("Loose Validator", (assert) => {
    populate(looseEmailValidationTestBattery, (data) => {
        assert.equal(looselyValid(data.email), data.expected, data.description)
    });

    assert.end();
});
