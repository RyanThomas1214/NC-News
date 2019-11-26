const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handle404s,
  handleCustoms,
  handle400s,
  handle500s
} = require("./errors");

app.use("/api", apiRouter);

// error handling middleware
app.use(handleCustoms);
app.use(handle400s);
app.use(handle500s);

// error controllers
app.use("/*", handle404s);

module.exports = app;
