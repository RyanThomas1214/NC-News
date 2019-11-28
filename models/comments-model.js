const knex = require("../db/connection");

exports.addComment = (article_id, body) => {
  body.author = body.username;
  body.article_id = article_id;
  delete body.username;
  return knex("comments")
    .insert(body)
    .returning("*");
};

exports.fetchCommentsByArticle = (article_id, query) => {
  return knex
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where({ article_id })
    .orderBy(query.sort_by || "created_at", query.order || "desc")
    .then(comments => {
      return comments.length === 0
        ? Promise.reject({ status: 404, msg: "Article not found" })
        : comments;
    });
};

exports.updateComment = (comment_id, body) => {
  return knex("comments")
    .where({ comment_id })
    .returning("*")
    .then(([comment]) => {
      if (comment === undefined) {
        return Promise.reject({
          status: 422,
          msg: "Unprocessable Entity"
        });
      } else {
        const newVotes = comment.votes + body.inc_votes;
        return knex("comments")
          .update("votes", newVotes)
          .where({ comment_id })
          .returning("*");
      }
    });
};

exports.removeComment = comment_id => {
  return knex("comments")
    .where({ comment_id })
    .del();
};
