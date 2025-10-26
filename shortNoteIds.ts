export const BASE36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// toBaseN converts the non-negative integer `n` to a base-`${digits.length}`
// representation in string form, using the characters in the string `digits` as
// the digits. For example, toBaseN(10, 'AB') === 'BABA'.
//
// Caveats:
// - Negative numbers aren't supported.
// - Non-integers aren't supported.
// - `digits` must be at least 2 characters long.
// - We assume that each character in `digits` is unique.
export function toBaseN(n: number, digits: string): string {
	if (n < 0) {
		throw `negative numbers are not supported`;
	}
	if (!Number.isInteger(n)) {
		throw `non-integers are not supported`;
	}

	const base = digits.length;
	if (base < 2) {
		throw `toBaseN() got invalid digit string: ${JSON.stringify(digits)}`;
	}

	if (n == 0) return digits[0];

	let nstr = '';
	while (n > 0) {
		const digit = digits[n % base];
		nstr = digit + nstr;
		n = Math.floor(n / base);
	}

	return nstr;
}

export type ShortIdParams = {
	epochYear: number,
	yearChars: string,
	monthChars: string,
	dayChars: string,
};

export class ShortIdDate {
	constructor(public readonly params: ShortIdParams, public readonly date: Date) {
		if (this._relativeYear() < 0) {
			throw `the given date is before the epochYear`;
		}
	}

	// _relativeYear() returns the year relative to the epoch
	_relativeYear(): number {
		return this.date.getFullYear() - this.params.epochYear;
	}

	// year() returns the year using yearChars
	year(): string {
		const year = this._relativeYear();
		return toBaseN(year, this.params.yearChars);
	}

	month(): string {
		return toBaseN(this.date.getMonth(), this.params.monthChars);
	}

	day(): string {
		return toBaseN(this.date.getDate(), this.params.dayChars);
	}

	datePart(): string {
		return `${this.year()}${this.month()}${this.day()}`;
	}
}