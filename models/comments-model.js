const knex = require("../db/connection");

exports.addComment = (article_id, body) => {
  body.author = body.username;
  body.article_id = article_id;
  delete body.username;
  return knex("comments").insert(body, ["*"]);
};
