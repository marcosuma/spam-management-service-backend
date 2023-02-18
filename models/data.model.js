"use strict";

const ReportModel = require("./mongoose/report.model.js");

exports.getReportModel = () => {
  if (process.env.DATA_MODEL == "mongoose") {
    return ReportModel;
  }
  throw new Error("No data model corresponding to: " + process.env.DATA_MODEL);
};
