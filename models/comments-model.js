const knex = require("../db/connection");

exports.addComment = (article_id, body) => {
  body.author = body.username;
  body.article_id = article_id;
  delete body.username;
  return knex("comments").insert(body, ["*"]);
};

exports.fetchCommentsByArticle = (article_id, query) => {
  return knex
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where({ article_id })
    .orderBy(query.sort_by || "created_at");
};
