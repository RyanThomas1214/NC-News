const ENV = process.env.NODE_ENV || "development";
const { config } = require("./config");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      username: config.username,
      password: config.passord
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: config.username,
      password: config.passord
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
