"use strict";

const DataModel = require("../../models/data.model.js");
const { TicketStateType } = require("../../utils/ticket_state.type.js");

const handle_error = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
    return;
  }
  res.status(500).send({ err });
};

const UPDATE_HANDLER = {
  CLOSED: {
    execute: (model, req, res) => {
      model
        .deleteReport(req.params.reportId)
        .then((result) => {
          if (result.deletedCount === 0) {
            res.status(404).send({ message: "Report id not found" });
            return;
          }
          res.status(200).send({
            id: req.params.reportId,
            message: "Report resolved successfully.",
          });
        })
        .catch((err) => handle_error(err, res));
    },
  },
  BLOCKED: {
    execute: (model, req, res) => {
      model
        .updateReportState(req.params.reportId, { state: req.body.ticketState })
        .then((result) => {
          if (!result) {
            res.status(404).send({ message: "Report id not found" });
            return;
          }
          res
            .status(200)
            .send({ id: result.id, message: "Report updated successfully" });
        })
        .catch((err) => handle_error(err, res));
    },
  },
};

exports.update_report = (req, res) => {
  UPDATE_HANDLER[req.body.ticketState].execute(
    DataModel.getReportModel(),
    req,
    res
  );
};

exports.get_reports = (req, res) => {
  const model = DataModel.getReportModel();
  model
    .getReports(req.body.perPage, req.body.page, {
      $or: [
        { state: TicketStateType.OPEN },
        { state: TicketStateType.BLOCKED },
      ],
    })
    .then((result) => {
      res.status(200).send(JSON.stringify(result));
    })
    .catch((err) => handle_error(err, res));
};
