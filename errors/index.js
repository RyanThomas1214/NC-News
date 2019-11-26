// error handling middleware
exports.handleCustoms = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err.msg);
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
