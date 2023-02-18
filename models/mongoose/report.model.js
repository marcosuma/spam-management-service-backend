"use strict";

const { TicketStateType } = require("../../utils/ticket_state.type");

const mongoose = require("../../config/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  state: {
    type: String,
    enum: {
      values: [
        TicketStateType.OPEN,
        TicketStateType.CLOSED,
        TicketStateType.BLOCKED,
      ],
      message: "{VALUE} is not supported",
    },
    default: TicketStateType.OPEN,
    required: true,
  },
  message: String,
});

const Report = mongoose.model("Reports", reportSchema);

exports.dropCollection = () => {
  return Report.collection.drop();
};

exports.createReport = (reportData) => {
  const report = new Report(reportData);
  return report.save();
};

exports.getReports = (perPage, page, clauseConditions) => {
  return new Promise((resolve, reject) => {
    Report.find(clauseConditions)
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, reports) {
        if (err) {
          reject(err);
        } else {
          resolve(reports);
        }
      });
  });
};

exports.updateReportState = (id, reportData) => {
  return Report.updateOne(
    { id: id },
    { $set: { state: reportData.state } },
    { runValidators: true }
  );
};

exports.deleteReport = (id) => {
  return new Promise((resolve, reject) => {
    Report.deleteOne({ id }, (err, report) => {
      if (err) {
        reject(err);
      } else {
        resolve(report);
      }
    });
  });
};
