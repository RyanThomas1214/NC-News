const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe.only("formatDates", () => {
  it("The function returns an array", () => {
    expect(formatDates([])).to.deep.equal([]);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
