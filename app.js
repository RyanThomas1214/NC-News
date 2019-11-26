const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { handle404s } = require("./errors");

app.use("/api", apiRouter);
app.use("/*", handle404s);

module.exports = app;
