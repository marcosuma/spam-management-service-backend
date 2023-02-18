const controller = require("../reports.controller");
const DataModel = require("../../../models/data.model.js");
const ReportModel = require("../../../models/mongoose/report.model.js");
const MongooseService = require("../../../config/services/mongoose.service.js");

jest.mock("../../../models/data.model.js");
jest.mock("../../../models/mongoose/report.model.js");
jest.mock("../../../config/services/mongoose.service.js");
jest.mock("mongoose");

require("dotenv").config();

describe("Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("calls model with deleteReport when update report to CLOSED is called", async () => {
    ReportModel.deleteReport.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ id: "mock-id" });
      });
    });
    DataModel.getReportModel.mockImplementation(() => {
      return ReportModel;
    });

    await controller.updateReport(
      { params: { reportId: "mock-id" }, body: { ticketState: "CLOSED" } },
      mockResponse()
    );

    expect(ReportModel.deleteReport).toBeCalled();
  });

  it("calls model with updateReportState when update report to BLOCKED is called", async () => {
    ReportModel.updateReportState.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(Object);
      });
    });
    DataModel.getReportModel.mockImplementation(() => {
      return ReportModel;
    });

    await controller.updateReport(
      { params: { reportId: "mock-id" }, body: { ticketState: "BLOCKED" } },
      mockResponse()
    );

    expect(ReportModel.updateReportState).toBeCalled();
  });

  it("calls the model correctly when getReports is called", async () => {
    ReportModel.getReports.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    });
    DataModel.getReportModel.mockImplementation(() => {
      return ReportModel;
    });

    await controller.getReports(
      { body: { perPage: 0, page: 0 } },
      mockResponse()
    );

    expect(ReportModel.getReports).toBeCalled();
  });
});
