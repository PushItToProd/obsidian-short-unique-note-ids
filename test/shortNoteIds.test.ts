import * as assert from "node:assert";
import { toBaseN } from "../shortNoteIds.js";

const BASE4_DIGITS = '0123';
const BASE12_DIGITS = '0123456789AB';
const BASE36_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe("toBaseN", function () {
	const tests = [
		{n: 0, ds: BASE4_DIGITS, expected: '0'},
		{n: 0, ds: BASE12_DIGITS, expected: '0'},
		{n: 0, ds: BASE36_DIGITS, expected: '0'},

		{n: 3*4, ds: BASE4_DIGITS, expected: '30'},
		{n: 3*4 + 1, ds: BASE4_DIGITS, expected: '31'},

		{n: 10*12, ds: BASE12_DIGITS, expected: 'A0'},
		{n: 10*12+11, ds: BASE12_DIGITS, expected: 'AB'},

		{n: 1*(36**2)+2*36+1, ds: BASE36_DIGITS, expected: '121'},
		{n: 5*(36**2)+11*36+7, ds: BASE36_DIGITS, expected: '5B7'},
	];

	tests.forEach(({n, ds, expected}) => {
		it(`correctly converts ${n} to ${expected} with digits ${ds}`, function () {
			assert.equal(toBaseN(n, ds), expected);
		});
	})
});