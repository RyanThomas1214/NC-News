const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticle,
  patchArticle
} = require("../controllers/articles-controller");
const {
  postComment,
  getCommentsByArticle
} = require("../controllers/comments-controller");
const { handle405s } = require("../errors");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticle)
  .all(handle405s);

module.exports = articlesRouter;
