const users = require("./20191125123220_create_users_table");
const articles = require("./20191125123622_create_articles_table");

exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now(3));
    commentsTable.string("body", [10000]).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
