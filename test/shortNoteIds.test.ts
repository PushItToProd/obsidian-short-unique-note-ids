import * as assert from "node:assert";
import { toBaseN, fromBaseN, ShortIdDate, ShortIdParams } from "../shortNoteIds.js";

const BASE2_DIGITS_AB = 'AB';
const BASE4_DIGITS = '0123';
const BASE12_DIGITS = '0123456789AB';
const BASE36_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE26_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

describe("ShortIdDate", function() {
  const shortIdParams: ShortIdParams = {
    epochYear: 2025,
    yearChars: BASE26_DIGITS,
    monthChars: BASE36_DIGITS,
    dayChars: BASE36_DIGITS,
  };

  describe("ShortIdDate - 2025-01-01 midnight", function() {
    const date = new Date(2025, 0, 1, 0, 0, 0, 0);
    const shortId = new ShortIdDate(shortIdParams, date);

    describe("#year()", function() {
      it('is "A"', function() {
        assert.equal(shortId.year(), "A");
      });
    });

    describe("#month()", function() {
      it('is "1"', function() {
        assert.equal(shortId.month(), "1");
      });
    });

    describe("#day()", function() {
      it('is "1"', function() {
        assert.equal(shortId.day(), "1");
      });
    });

    describe("#datePart()", function() {
      it('is "A11"', function() {
        assert.equal(shortId.datePart(), "A11");
      });
    });
  });

  describe("ShortIdDate - 2026-06-15 12:00", function() {
    const date = new Date(2026, 5, 15, 12, 0, 0, 0);
    const shortId = new ShortIdDate(shortIdParams, date);

    describe("#year()", function() {
      it('is "B"', function() {
        assert.equal(shortId.year(), "B");
      });
    });

    describe("#month()", function() {
      it('is "6"', function() {
        assert.equal(shortId.month(), "6");
      });
    });

    describe("#day()", function() {
      it('is "F"', function() {
        assert.equal(shortId.day(), "F");
      });
    });

    describe("#datePart()", function() {
      it('is "B6F"', function() {
        assert.equal(shortId.datePart(), "B6F");
      });
    });
  });

  describe("ShortIdDate - 2026-12-31 23:59", function() {
    const date = new Date(2026, 11, 31, 23, 59, 59, 999);
    const shortId = new ShortIdDate(shortIdParams, date);

    describe("#year()", function() {
      it('is "B"', function() {
        assert.equal(shortId.year(), "B");
      });
    });

    describe("#month()", function() {
      it('is "C"', function() {
        assert.equal(shortId.month(), "C");
      });
    });

    describe("#day()", function() {
      it('is "V"', function() {
        assert.equal(shortId.day(), "V");
      });
    });

    describe("#datePart()", function() {
      it('is "BCV"', function() {
        assert.equal(shortId.datePart(), "BCV");
      });
    });
  });
});
