/** @format */

import { dateFormat } from "../src/index";

interface KnownDateTestData {
  date: Date;
  format: string;
  expected: string;
}

describe("dateFormat", () => {
  const tests: KnownDateTestData[] = [
    {
      date: new Date(2021, 2, 5, 8, 23, 56),
      format: "Y-m-d H:i:s",
      expected: "2021-03-05 08:23:56",
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "l jS \\o\\f F Y h:i:s A",
      expected: "Tuesday 24th of January 1984 10:09:56 AM",
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "r",
      expected: "Tue, 24 Jan 1984 10:09:56 -0100", // test depends on timezone...
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "B",
      expected: "423",
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "L",
      expected: "1",
    },
    {
      date: new Date(2000, 0, 1, 0, 0, 0),
      format: "L",
      expected: "1",
    },
    {
      date: new Date(1990, 0, 1, 0, 0, 0),
      format: "L",
      expected: "0",
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "W",
      expected: "4",
    },
    {
      date: new Date(1984, 0, 24, 10, 9, 56),
      format: "S",
      expected: "th",
    },
  ];

  tests.forEach((test) => {
    it(`Known ${test.date.toISOString()} formatted using "${
      test.format
    }" becomes "${test.expected}"`, () => {
      expect(dateFormat(test.date, test.format)).toEqual(test.expected);
    });
  });
});
