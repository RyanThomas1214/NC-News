const knex = require("../db/connection");

exports.addComment = (article_id, body) => {
  const comment = {
    author: body.username,
    body: body.body,
    article_id: article_id
  };
  return knex("comments").insert(comment, ["*"]);
};
