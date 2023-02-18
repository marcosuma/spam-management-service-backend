"use strict";

require("dotenv/config");
const express = require("express");
const app = express();
const routes = require("./web/routes/routes.js");
const logger = require("./config/components/winston.logger.js");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  return next();
});

app.use(express.json());
routes.routesConfig(app);

app.listen(process.env.PORT, function () {
  logger.info(`app listening at port ${process.env.PORT}.`);
});
