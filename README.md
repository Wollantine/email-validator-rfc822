#Email Validator RFC822
Validate emails accordingly to standard RFC822.

##Why?

The standardRFC822 or "Standard for ARPA Internet Text Messages" is the most general standard that email addresses can follow. Thus, it allows many more possible addresses than other standards. It is a loose check, compared to others.

Other validators don't allow email addresses that are valid as per RFC822, and I consider that unfair, even if they cover 99% of the cases. Some others might even allow non valid email addresses, so I decided to implement my own, despite the many many email validators out there. I apologise for that.

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

##Methods
- ####`valid(emailAddress: String): boolean`
Processes the emailAddress through all the described filters in order of declaration.
Then, validates the processed emailAddress against RFC822.

- ####`looselyValid(emailAddress: String): boolean`
Processes the emailAddress through all the described filters in order of declaration.
Then, validates the processed emailAddress against a custom pattern that covers the most
usual email addresses. Note this is non RFC822 compliant.

- ####`process(emailAddress: String): String`
Processes the emailAddress through all the described filters in order of declaration, and returns it.

- ####`.trimmed`
A validator that will trim the email before validating it.

- ####`.lowercased`
A validator that will lowercase the email before validating it.

##How does it work?
Magic! Ha ha ha... Not quite.

### Method chaining
Upon initialization (the function call after the require), `email` object is fully built from its prototype `EmailValidator`. This object contains one field per filter (chainable method), plus the finalization non-chainable methods (i.e. valid, process...). Each chainable method contains a copy of the `email` object itself, but with a filter applied to it, and without the already used chainable methods, as `email.trimmed.trimmed` makes no sense.
To sum it up, `email` is a tree of `EmailValidator` objects, each one containing all the filters that haven't been applied if the object gets called as chainable methods.
E.g.:
```
email.trimmed -> EmailValidator(
    filters:[trim],
    lowercased:EmailValidator,
    valid:func,
    ...
)
```

### Email validation (RFC822)
It uses a regex that implements the following grammar, which is a simplification of RFC822's specs at [http://www.w3.org/Protocols/rfc822/]:
```
emailPattern    => ^localPart@domain$ // ^ and $ match the beggining and end of the string

localPart       => word(.word)*
word            => (atom|quotedString)
quotedString    => (qtext|quotedPair)*

domain          => subdomain(.subdomain)*
subdomain       => (domainRef|domainLiteral)
domainRef       => atom
domainLiteral   => [(dtext|quotedPair)*] // e.g. [10.0.3.19]

qtext           => Any CHAR except <">, "\" and CR (aka \r)
atom            => Any CHAR except specials, SPACE and CTLs
dtext           => Any CHAR except "[", "]", "\" and CR
quotedPair      => \CHAR

```
