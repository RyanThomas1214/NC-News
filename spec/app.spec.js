process.env.NODE_ENV = "test";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe.only("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it("status code 200: responds with an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.be.an("array");
            expect(topics[0]).keys("description", "slug");
          });
      });
    });
  });
});
