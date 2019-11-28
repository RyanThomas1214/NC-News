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

exports.fetchArticles = ({ author, topic, sort_by, order }) => {
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
      if (author) knexQuery.where({ "articles.author": author });
      if (topic) knexQuery.where({ "articles.topic": topic });
    })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc");
};
