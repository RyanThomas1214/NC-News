const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handle404s,
  handleCustoms,
  handle400s,
  handle422s,
  handle500s
} = require("./errors");

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

// error handling middleware
app.use(handleCustoms);
app.use(handle400s);
app.use(handle422s);
app.use(handle500s);

// error controllers
app.use("/*", handle404s);

module.exports = app;
