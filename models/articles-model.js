const knex = require("../db/connection");

exports.fetchArticle = article_id => {
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .then(newArticle => {
      return newArticle.length === 0
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

exports.fetchArticles = query => {
  return knex
    .select(
      "articles.author",
      "title",
      "articles.article_id",
      "topic",
      "articles.created_at",
      "articles.votes"
    )
    .count("comments.article_id as comment_count")
    .from("articles")
    .modify(knexQuery => {
      if (query.author) knexQuery.where({ "articles.author": query.author });
      if (query.topic) knexQuery.where({ "articles.topic": query.topic });
    })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(query.sort_by || "created_at", query.order || "desc");
};
