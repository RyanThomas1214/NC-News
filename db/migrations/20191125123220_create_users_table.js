exports.up = function(knex) {
  console.log("Creating Users Table");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function(knex) {
  console.log("Dropping Users Table");
  return knex.schema.dropTable("users");
};
