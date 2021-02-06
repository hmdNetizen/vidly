const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

module.exports = function () {
  process.on("uncaughtException", (err) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    winston.error(err.message, err);
    process.exit(1);
  });

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (err) => {
    throw err;
  });

  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "error" })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
    })
  );
};
