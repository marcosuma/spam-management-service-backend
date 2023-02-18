"use strict";

const reports = require("../controllers/reports.controller.js");
const middleware = require("../middleware/reports.middleware.js");

exports.routesConfig = function (app) {
  app.post("/reports/:reportId", [
    middleware.verifyTicketStateFieldExists,
    reports.update_report,
  ]);

  app.get("/get_reports", [reports.get_reports]);
};
