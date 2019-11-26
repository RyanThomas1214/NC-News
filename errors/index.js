// error controllers

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};
