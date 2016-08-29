import escapeRegExp from 'lodash.escaperegexp';

/*
	Grammar for valid RFC822 email addresses.

	Implementation according to: http://www.w3.org/Protocols/rfc822/
	In particular, check sections 6.Address Specification and 3.3.Lexical Tokens
 */
const atom = '';
const quotedPair = '';

// Local Part (e.g. jon.snow)
const qtext = '';
const quotedString = '"('+qtext+'|'+quotedPair+')*"'
const word = '('+atom+'|'+quotedString+')';
const localPart = word+'(\.'+word+')*';

// Domain part (e.g. gmail.com)
const dtext = '';
const domainLiteral = '\[('+dtext+'|'+quotedPair+')*\]'; // Something like [10.0.3.19]
const domainRef = atom;
const subdomain = '('+domainRef+'|'+domainLiteral+')';
const domain = subdomain+'(\.'+subdomain+')*';

const emailPattern = '/^'+localPart+'@'+domain+'$/';

const pattern = new RegExp(escapeRegExp(emailPattern));

/*
	Strict RFC822 validation
 */
exports.strictlyValid = (email) => {
	return pattern.test(email);
}

/*
	Non-strict validation
	Expression to test for usual email addresses (not RFC822 compliant)
 */
const W3C_HTML5_email_field_regex = /^[a-zA-Z0-9\.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

exports.looselyValid = (email) => {
	return W3C_HTML5_email_field_regex.test(email);
}
