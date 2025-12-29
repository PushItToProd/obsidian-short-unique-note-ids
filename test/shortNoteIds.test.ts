import * as assert from "node:assert";
import { toBaseN, ShortIdDate, ShortIdParams, BASE36_CHARS } from "../shortNoteIds.js";

const BASE2_DIGITS_AB = 'AB';
const BASE4_DIGITS = '0123';
const BASE12_DIGITS = '0123456789AB';
const BASE36_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe("toBaseN", function() {
  const tests = [
    {n: 0, ds: BASE4_DIGITS, expected: '0'},
    {n: 0, ds: BASE12_DIGITS, expected: '0'},
    {n: 0, ds: BASE36_DIGITS, expected: '0'},

    {n: 10, ds: BASE2_DIGITS_AB, expected: 'BABA'},

    {n: 3*4, ds: BASE4_DIGITS, expected: '30'},
    {n: 3*4 + 1, ds: BASE4_DIGITS, expected: '31'},

    {n: 10*12, ds: BASE12_DIGITS, expected: 'A0'},
    {n: 10*12+11, ds: BASE12_DIGITS, expected: 'AB'},

    {n: 1*(36**2)+2*36+1, ds: BASE36_DIGITS, expected: '121'},
    {n: 5*(36**2)+11*36+7, ds: BASE36_DIGITS, expected: '5B7'},
  ];

  tests.forEach(({n, ds, expected}) => {
    it(`correctly converts ${n} to ${expected} with digits ${ds}`, function() {
      assert.equal(toBaseN(n, ds), expected);
    });
  })
});

describe("ShortIdDate", function() {
  const shortIdParams: ShortIdParams = {
    epochYear: 2025,
    yearChars: 'ABC',
    monthChars: BASE36_CHARS,
    dayChars: BASE36_CHARS,
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

  describe("ShortIdDate - 2026-12-31 23:59", function() {
    const date = new Date(2026, 12, 31, 23, 59, 59, 999);
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