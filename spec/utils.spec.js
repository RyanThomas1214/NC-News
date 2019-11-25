const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe.only("formatDates", () => {
  it("The function returns an array", () => {
    expect(formatDates([])).to.be.an("array");
  });
  it("Returns an array containing an object with the same keys as the original object", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actual = formatDates(input);
    expect(actual[0]).keys(
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes"
    );
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
