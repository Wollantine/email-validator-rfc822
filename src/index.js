import {strictlyValid, looselyValid} from './validate';

// Returns a copy of an EmailValidator object with an added filter in filterName position
const pushFilter = (obj, filterName) => {
	var cloneFilters = [...obj.filterPipeline];
	cloneFilters.push(filterName);
	let clone = new EmailValidator(cloneFilters);
	return clone;
};

const validFilters = {
	trimmed: (email) => (email.trim()),
	lowercased: (email) => (email.toLowerCase())
}

class EmailValidator {
	constructor(filters = []) {
		this.filterPipeline = filters;
		for (var filterName	in validFilters) {
			// If filter is not added to my filter chain
			if (this.filterPipeline.indexOf(filterName) == -1) {
				// I should have a method to chain the filter
				// e.g. this.trimmed.valid(x) == this.valid( trimmed(x) )
				// That is, I contain an object that is much like myself,
				// but will run the valid() parameter through this filter as well
				// (for each possible filter).
				this[filterName] = pushFilter(this, filterName);
			}
		}
	}

	// Runs email through the filterPipeline
	process(email) {
		for (var filterName of this.filterPipeline) {
			email = validFilters[filterName](email);
		}
		return email;
	}

	// Runs email through the filterPipeline and then checks if it is RFC822 compliant.
	valid(email) {
		return strictlyValid(process(email));
	}

	// Runs email through the filterPipeline and then checks if it is valid in terms of most usual email addresses
	// (non RFC822 compliant)
	looselyValid(email) {
		return looselyValid(process(email));
	}

}

exports = module.exports = emailValidator;

function emailValidator() {
	return new EmailValidator();
};
