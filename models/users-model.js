const knex = require("../db/connection");

exports.fetchUser = username => {
  return knex
    .select("*")
    .from("users")
    .where({ username })
    .then(user => {
      return user.length === 0
        ? Promise.reject({ status: 404, msg: "User not found" })
        : user;
    });
};
