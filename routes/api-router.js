const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const { handle404s } = require("../errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/*", handle404s);

module.exports = apiRouter;
