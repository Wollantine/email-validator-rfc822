#Email Validator RFC822
Validate emails accordingly to standard RFC822.

##Why?

The standardRFC822 or "Standard for ARPA Internet Text Messages" is the most general standard that email addresses can follow. Thus, it allows many more possible addresses than other standards. It is a loose check, compared to others.

Other validators don't allow email addresses that are valid as per RFC822, and I consider that unfair, even if they cover 99% of the cases. Some others might even allow non valid email addresses, so I decided to implement my own, despite the many many email validators out there. Sorry for that.

##Usage

To validate emails:
```javascript
var email = require('email-validator-rfc822')(); //Notice the function call

// Ok
if (email.valid('yourAddress@domain.com')) console.log('Ok');

// Surprisingly, Ok
if (email.valid('_this."\\is @ valid email"!@domain.co')) console.log('Ok');

// Not Ok
if (!email.valid('this..is@not.valid')) console.log('Not Ok');

```

To chain filters to the email before checking its validity:
```javascript
// Trim it! (Ok)
if (email.trimmed.valid(' frodo.baggins@the.shire ')) console.log('Ok');

// Lowercase and trim it! (Ok)
if (email.lowercased.trimmed.valid(' Frodo.Baggins@The.Shire ')) console.log('Ok');
```

##How does it work?
Magic! Ha ha ha... Not quite.
