const knex = require("../db/connection");

exports.addComment = (article_id, { username, body }) => {
  const comment = { author: username, article_id, body };
  return knex("comments")
    .insert(comment)
    .returning("*");
};

exports.fetchCommentsByArticle = (article_id, { sort_by, order }) => {
  return knex
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc")
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
