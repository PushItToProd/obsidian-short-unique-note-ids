import * as assert from "node:assert";
import { toBaseN, fromBaseN, ShortIdDate, ShortIdParams } from "../shortNoteIds.js";

const BASE2_DIGITS_AB = 'AB';
const BASE4_DIGITS = '0123';
const BASE12_DIGITS = '0123456789AB';
const BASE26_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE36_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe("base conversion", function() {
  const tests = [
    {n: 0, numerals: BASE4_DIGITS, expected: '0'},
    {n: 0, numerals: BASE12_DIGITS, expected: '0'},
    {n: 0, numerals: BASE36_DIGITS, expected: '0'},

    {n: 10, numerals: BASE2_DIGITS_AB, expected: 'BABA'},

    {n: 3*4, numerals: BASE4_DIGITS, expected: '30'},
    {n: 3*4 + 1, numerals: BASE4_DIGITS, expected: '31'},

    {n: 10*12, numerals: BASE12_DIGITS, expected: 'A0'},
    {n: 10*12+11, numerals: BASE12_DIGITS, expected: 'AB'},

    {n: 1*(36**2)+2*36+1, numerals: BASE36_DIGITS, expected: '121'},
    {n: 5*(36**2)+11*36+7, numerals: BASE36_DIGITS, expected: '5B7'},
  ];

  describe("toBaseN", function() {
    tests.forEach(({n, numerals, expected}) => {
      it(`correctly converts ${n} to ${expected} with numerals ${numerals}`, function() {
        assert.equal(toBaseN(n, numerals), expected);
      });
    })
  });

  describe("fromBaseN", function() {
    it(`raises an error on invalid characters`, function() {
      assert.throws(() => {
        fromBaseN("BA1B", BASE2_DIGITS_AB);
      }, /invalid numeral.*1/);
    });

    tests.forEach(({n: expected, numerals, expected: n}) => {
      it(`correctly converts ${n} to ${expected} with numerals ${numerals}`, function() {
        assert.equal(fromBaseN(n, numerals), expected);
      });
    })
  })
});

class _ShortIdExpected {

  constructor(
    public readonly year: string,
    public readonly month: string,
    public readonly day: string,
    public readonly hour: string,
  ) {}

  public get datePart(): string {
    return this.year + this.month + this.day;
  }
};

function testShortIdDate(shortIdParams: ShortIdParams, date: Date, expected: _ShortIdExpected) {
  const shortId = new ShortIdDate(shortIdParams, date);

  describe("#year()", function() {
    it(`is "${expected.year}"`, function() {
      assert.equal(shortId.year(), expected.year);
    });
  });

  describe("#month()", function() {
    it(`is "${expected.month}"`, function() {
      assert.equal(shortId.month(), expected.month);
    });
  });

  describe("#day()", function() {
    it(`is "${expected.day}"`, function() {
      assert.equal(shortId.day(), expected.day);
    });
  });

  describe("#datePart()", function() {
    it(`is "${expected.datePart}"`, function() {
      assert.equal(shortId.datePart(), expected.datePart);
    });
  });

  describe("#hour()", function() {
    it(`is "${expected.hour}"`, function() {
      assert.equal(shortId.hour(), expected.hour);
    });
  });
}

describe("ShortIdDate", function() {
  const shortIdParams: ShortIdParams = {
    epochYear: 2025,
    yearChars: BASE26_DIGITS,
    monthChars: BASE36_DIGITS,
    dayChars: BASE36_DIGITS,
    hourChars: BASE26_DIGITS,
  };

  const tests = [
    {
      desc: "2025-01-01 midnight",
      date: new Date(2025, 0, 1, 0, 0, 0, 0),
      expected: new _ShortIdExpected("A", "1", "1", "A"),
    },
    {
      desc: "2026-06-15 12:00",
      date: new Date(2026, 5, 15, 12, 0, 0, 0),
      expected: new _ShortIdExpected("B", "6", "F", "M"),
    },
    {
      desc: "2026-12-31 23:59",
      date: new Date(2026, 11, 31, 23, 59, 59, 999),
      expected: new _ShortIdExpected("B", "C", "V", "X"),
    },
  ];

  tests.forEach(({desc, date, expected}) => describe(desc, function() {
    testShortIdDate(shortIdParams, date, expected);
  }))
});
