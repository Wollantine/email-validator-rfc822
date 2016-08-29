var email = require('../dist/index')();
var test = require('tape');


test('Email Validator RFC822 Examples', (assert) => {
	// Ok
	assert.ok(email.valid('yourAddress@domain.com'), 'yourAddress@domain.com should be Ok');

	// Surprisingly, Ok
	assert.ok(email.valid('_this."\\is @ valid email"!@domain.co'), '_this."\\is @ valid email"!@domain.co should surprisingly be Ok');

	// Not Ok
	assert.notOk(!email.valid('this..is@not.valid'), 'this..is@not.valid should not be Ok');

	// Trim it! (Ok)
	assert.ok(email.trimmed.valid(' frodo.baggins@the.shire '), 'Non-trimmed emails should be valid if filtered through trimmer');

	// Lowercase and trim it! (Ok)
	assert.ok(email.lowercased.trimmed.valid(' Frodo.Baggins@The.Shire '), 'It should work the same when using lowercase filter');

	assert.end();

});
