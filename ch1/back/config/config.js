const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "nodebird",
    password: process.env.DB_PASSWORD,
    database: "react_nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    timezone: "+09:00",
  },
  test: {
    username: "nodebird",
    password: process.env.DB_PASSWORD,
    database: "react_nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: "nodebird",
    password: process.env.DB_PASSWORD,
    database: "react_nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    timezone: "+09:00",
  },
};
