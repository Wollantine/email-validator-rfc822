var email = require('../dist/index')();
var test = require('tape');


test("Email Validator RFC822", (assert) => {
	// Ok
	assert.ok(email.valid('yourAddress@domain.com'));

	// Surprisingly, Ok
	assert.ok(email.valid('_this."\\is @ valid email"!@domain.co'));

	// Not Ok
	assert.notOk(!email.valid('this..is@not.valid'));

	// Trim it! (Ok)
	assert.ok(email.trimmed.valid(' frodo.baggins@the.shire '));

	// Lowercase and trim it! (Ok)
	assert.ok(email.lowercased.trimmed.valid(' Frodo.Baggins@The.Shire '));

	assert.end();

});
