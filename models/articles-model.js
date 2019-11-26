const knex = require("../db/connection");

exports.fetchArticle = article_id => {
  return knex
    .select("*")
    .from("comments")
    .where({ article_id })
    .returning("*")
    .then(comments => {
      return knex
        .select("*")
        .from("articles")
        .where({ article_id })
        .returning("*")
        .then(([article]) => {
          const newArticle = { ...article, comment_count: comments.length };
          return newArticle;
        });
    })
    .then(newArticle => {
      return !newArticle.article_id
        ? Promise.reject({ status: 404, msg: "Article not found" })
        : newArticle;
    });
};

exports.updateArticle = (article_id, body) => {
  return knex("articles")
    .where({ article_id })
    .returning("*")
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({
          status: 422,
          msg: "Unprocessable Entity"
        });
      } else {
        const newVotes = article.votes + body.inc_votes;
        return knex("articles")
          .update("votes", newVotes)
          .where({ article_id })
          .returning("*");
      }
    });
};
