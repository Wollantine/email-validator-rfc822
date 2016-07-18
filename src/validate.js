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
const nonStrictPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

exports.looselyValid = (email) => {
	return nonStrictPattern.test(email);
}
