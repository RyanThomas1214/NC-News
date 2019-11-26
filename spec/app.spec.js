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
  describe("/users", () => {
    describe("/:username", () => {
      describe("GET", () => {
        it("status code 200: responds with a user object", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.be.an("object");
              expect(user).keys("username", "avatar_url", "name");
            });
        });
        it("status code 404: responds with msg User not found", () => {
          return request(app)
            .get("/api/users/123")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("User not found");
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
              [method]("/api/users/butter_bridge")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Method not allowed");
              });
          });
          return Promise.all(methodPromises);
        });
      });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      describe("GET", () => {
        it("status code 200: responds with an article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).to.be.an("object");
              expect(article).keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("status code 400: responds with msg Bad request", () => {
          return request(app)
            .get("/api/articles/one")
            .expect(400);
        });
        it("status code 404: responds with msg Article not found", () => {
          return request(app)
            .get("/api/articles/99")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Article not found");
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
        it("status code 405: responds with msg Method not allowed", () => {
          const invalidMethods = ["post", "patch", "put", "delete"];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/articles/1")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Method not allowed");
              });
          });
          return Promise.all(methodPromises);
        });
      });
    });
  });
});
