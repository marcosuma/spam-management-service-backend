"use strict";

exports.verifyTicketStateFieldExists = (req, res, next) => {
  if (!req.body || !req.body.ticketState) {
    return res
      .status(400)
      .send({ error: "Required field ticketState is missing" });
  }
  return next();
};
