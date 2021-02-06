require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const error = require("./middleware/error");
const app = express();
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(err.message, err);
});

winston.add(
  new winston.transports.File({ filename: "logfile.log", level: "error" })
);

winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
  })
);

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error!: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB"));

app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rentals", require("./routes/rentals"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.use(error);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
