process.env.NODE_ENV = "test";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/api", () => {
  it("status code 404: responds with msg path not found", () => {
    return request(app)
      .get("/abc")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Path not found");
      });
  });
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
      it("status code 404: responds with msg path not found", () => {
        return request(app)
          .get("/api/abcd")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Path not found");
          });
      });
    });
    describe("INVALID METHODS", () => {
      it("status code 405: responds with msg method not allowed", () => {
        const invalidMethods = ["post", "patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe.only("/users", () => {
    describe("/:username", () => {
      it("status code 200: responds with a user object", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body).keys("username", "avatar_url", "name");
          });
      });
    });
  });
});
