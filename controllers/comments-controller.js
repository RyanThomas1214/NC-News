const { addComment } = require("../models/comments-model");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  addComment(article_id, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
