export function toBaseN(n: number, digits: string): string {
	if (n < 0) {
		throw `negative numbers are not supported`;
	}

	const base = digits.length;
	if (base < 2) {
		throw `toBaseN() got invalid digit string: ${JSON.stringify(digits)}`;
	}

	// TODO: validate `ds` is all unique

	if (n == 0) return digits[0];

	let nstr = '';
	while (n > 0) {
		const digit = digits[n % base];
		nstr = digit + nstr;
		n = Math.floor(n / base);
	}

	return nstr;
}