const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const usersRouter = require("./users-router.js");
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router");
const { getEndpoints } = require("../controllers/api-controller");
const { handle405s, handle404s } = require("../errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
  .route("/")
  .get(getEndpoints)
  .all(handle405s);
apiRouter.use("/*", handle404s);

module.exports = apiRouter;
