const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("The function returns an array", () => {
    expect(formatDates([])).to.be.an("array");
  });
  it("Returns a new array", () => {
    const input = [1, 2, 3];
    expect(formatDates(input)).to.not.equal(input);
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
  it("Returns an array with an object containing a newly formatted date", () => {
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
    expect(actual[0].created_at).to.deep.equal(new Date(actual[0].created_at));
  });
  it("Returns an array with all objects containing a newly formatted date", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const actual = formatDates(input);
    expect(actual[0].created_at).to.deep.equal(new Date(actual[0].created_at));
    expect(actual[1].created_at).to.deep.equal(new Date(actual[1].created_at));
    expect(actual[2].created_at).to.deep.equal(new Date(actual[2].created_at));
    expect(actual.length).to.equal(3);
  });
});

describe.only("makeRefObj", () => {
  it("Returns an object", () => {
    expect(makeRefObj([])).to.be.an("object");
  });
  it("Returns an object with a key = item's title and a value = item's ID", () => {
    expect(makeRefObj([{ article_id: 1, title: "A" }])).to.deep.equal({ A: 1 });
  });
  it("Returns an object with a key = item's title and a value = item's ID for a multi-item array", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" }
    ];
    expect(makeRefObj(input)).to.deep.equal({ A: 1, B: 2, C: 3 });
  });
});

describe("formatComments", () => {});
