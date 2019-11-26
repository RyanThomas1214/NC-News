const { fetchArticle, updateArticle } = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  updateArticle(article_id, body)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
