// error handling middleware
exports.handleCustoms = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handle400s = (err, req, res, next) => {
  const codes = ["22P02", "23502", "42703"];
  if (codes.includes(err.code)) res.status(400).send({ msg: "Bad request" });
  else next(err);
};

exports.handle422s = (err, req, res, next) => {
  if (err.code === "23503")
    res.status(422).send({ msg: "Unprocessable Entity" });
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error" });
};

// error controllers

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};
