const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => winston.info("Server running on port " + PORT));
