process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
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
    describe("GET", () => {
      it("status code 200: responds with an array of article objects", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.an("array");
            expect(articles[0]).keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("status code 200: allows query sort_by which defaults to date", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.descendingBy("created_at");
          });
      });
      it("status code 200: allows query sort_by of any valid column", () => {
        return request(app)
          .get("/api/articles?sort_by=votes")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.descendingBy("votes");
          });
      });
      it("status code 200: allows query order which defaults to desc", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.ascendingBy("created_at");
          });
      });
      it("status code 200: allows query author which filters query when passed valid username", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(3);
            expect(articles[0].author).to.equal("butter_bridge");
          });
      });
      it("status code 200: allows query topic which filters query when passed valid topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(11);
            expect(articles[0].topic).to.equal("mitch");
          });
      });
      it("status code 400: responds with msg Bad request for incorrect query value", () => {
        return request(app)
          .get("/api/articles?sort_by=dogs")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
    });
    describe("INVALID METHODS", () => {
      it("status code 405: responds with msg Method not allowed", () => {
        const invalidMethods = ["patch", "post", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/articles")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
    describe("/:article_id", () => {
      describe("GET", () => {
        it("status code 200: responds with an article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).to.be.an("object");
              expect(article).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              );
            });
        });
        it("status code 200: adds property of comment_count to article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.comment_count).to.equal("13");
            });
        });
        it("status code 400: responds with msg Bad request", () => {
          return request(app)
            .get("/api/articles/one")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
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
      describe("PATCH", () => {
        it("status code 200: responds with the updated article object", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 3 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).to.be.an("object");
              expect(article.votes).to.equal(103);
              expect(article).keys(
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at"
              );
            });
        });
        it("status code 400: responds with msg Bad request", () => {
          return request(app)
            .patch("/api/articles/one")
            .send({ inc_votes: 3 })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("status code 422: responds with msg Unprocessable Entity", () => {
          return request(app)
            .patch("/api/articles/99")
            .send({ inc_votes: 3 })
            .expect(422)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Unprocessable Entity");
            });
        });
      });
      describe("INVALID METHODS", () => {
        it("status code 405: responds with msg Method not allowed", () => {
          const invalidMethods = ["post", "put", "delete"];
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
      describe("/comments", () => {
        describe("POST", () => {
          it("status code 201: responds with posted comment object", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "My First Comment" })
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment).to.be.an("object");
                expect(comment).keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                );
              });
          });
          it("status code 400: responds with msg Bad request for invalid article_id", () => {
            return request(app)
              .post("/api/articles/one/comments")
              .send({ username: "butter_bridge", body: "My First Comment" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
          it("status code 400: responds with msg Bad request for missing column on body", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
          it("status code 400: responds with msg Bad request for body with column that doesn't exist on table", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "butter_bridge",
                text: "My First Comment"
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
          it("status code 422: responds with msg Unprocessable Entity", () => {
            return request(app)
              .post("/api/articles/99/comments")
              .send({
                username: "butter_bridge",
                body: "My First Comment"
              })
              .expect(422)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Unprocessable Entity");
              });
          });
        });
        describe("GET", () => {
          it("status code 200: responds with array of comment objects specific to article_id", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.an("array");
                expect(comments[0]).keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                );
              });
          });
          it("status code 200: allows query sort_by which defaults to created_at", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.descendingBy("created_at");
              });
          });
          it("status code 200: allows query sort_by of any valid column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.descendingBy("votes");
              });
          });
          it("status code 200: allows query order which defaults to desc", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.descendingBy("votes");
              });
          });
          it("status code 200: allows query order to be changed to asc", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&order=asc")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.ascendingBy("votes");
              });
          });
          it("status code 400: responds with msg Bad request for invalid article_id", () => {
            return request(app)
              .get("/api/articles/one/comments")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
          it("status code 400: responds with msg Bad request for invalid query value", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=cats")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
          it("status code 404: responds with msg Article not found for non-existent article_id", () => {
            return request(app)
              .get("/api/articles/99/comments")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Article not found");
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status code 405: responds with msg Method not allowed", () => {
            const invalidMethods = ["patch", "put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/articles/1/comments")
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
  describe("/comments", () => {
    describe("PATCH", () => {
      it("status code 200: responds with the updated article object", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 3 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).to.be.an("object");
            expect(comment.votes).to.equal(19);
            expect(comment).keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("status code 400: responds with msg Bad request", () => {
        return request(app)
          .patch("/api/comments/one")
          .send({ inc_votes: 3 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Bad request");
          });
      });
      it("status code 422: responds with msg Unprocessable Entity", () => {
        return request(app)
          .patch("/api/comments/99")
          .send({ inc_votes: 3 })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Unprocessable Entity");
          });
      });
    });
    describe.only("INVALID METHODS", () => {
      it("status code 405: responds with msg Method not allowed", () => {
        const invalidMethods = ["get", "post", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/comments/1")
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
