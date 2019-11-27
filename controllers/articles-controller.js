const {
  fetchArticle,
  updateArticle,
  fetchArticles
} = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(([article]) => {
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

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
