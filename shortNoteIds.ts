export const BASE36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// toBaseN converts the non-negative integer `n` to a base-`${numerals.length}`
// representation in string form, using the characters in the string `numerals`.
// For example, toBaseN(10, 'AB') === 'BABA'.
//
// Caveats:
// - Negative numbers aren't supported.
// - Non-integers aren't supported.
// - `digits` must be at least 2 characters long.
// - We assume that each character in `digits` is unique.
export function toBaseN(n: number, numerals: string): string {
  if (n < 0) {
    throw `negative numbers are not supported`;
  }
  if (!Number.isInteger(n)) {
    throw `non-integers are not supported`;
  }

  const base = numerals.length;
  if (base < 2) {
    throw `toBaseN() got invalid numerals string: ${JSON.stringify(numerals)}`;
  }

  if (n == 0) return numerals[0];

  let nstr = '';
  while (n > 0) {
    const digit = numerals[n % base];
    nstr = digit + nstr;
    n = Math.floor(n / base);
  }

  return nstr;
}

// fromBaseN is the inverse of toBaseN, i.e. it converts the string `nstr` from
// a `base-${numerals.length}` representation using the characters in `numerals`
// to a number.
export function fromBaseN(nstr: string, numerals: string): number {
  const base = numerals.length;
  if (base < 2) {
    throw `fromBaseN() got invalid numerals string: ${JSON.stringify(numerals)}`;
  }

  // build a map of numerals to their values. e.g. if numerals='ABC', then we'll
  // have numeralsMap {A: 0, B: 1, C: 2}
  const numeralsMap: Record<string, number> = {};
  for (let i = 0, numeral = numerals[i]; i < numerals.length; numeral = numerals[++i]) {
    numeralsMap[numeral] = i;
  }

  const nlen = nstr.length;

  // calculate the value of nstr
  let n = 0;
  for (let i = 0, digit = nstr[i]; i < nstr.length; digit = nstr[++i]) {
    const placeVal = base ** (nlen - i - 1);
    if (!(digit in numeralsMap)) {
      throw new Error(`invalid numeral: ${digit} (expected one of ${JSON.stringify(numerals)})`);
    }
    n += numeralsMap[digit] * placeVal;
  }
  return n;
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

  // JavaScript's date type uses zero-indexed months, but we want them to be
  // one-indexed to match the year and day.
  get monthNumber(): number {
    return this.date.getMonth() + 1;
  }

  month(): string {
    return toBaseN(this.monthNumber, this.params.monthChars);
  }

  day(): string {
    return toBaseN(this.date.getDate(), this.params.dayChars);
  }

  datePart(): string {
    return `${this.year()}${this.month()}${this.day()}`;
  }
}
