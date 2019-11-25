const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe.only("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it("status code 200", () => {
        return request(app)
          .get("/api/topics")
          .expect(200);
      });
    });
  });
});
