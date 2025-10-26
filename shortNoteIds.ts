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