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

  it("should call the model correctly when get_reports is called", async () => {
    ReportModel.getReports.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    });
    DataModel.getReportModel.mockImplementation(() => {
      return ReportModel;
    });

    await controller.get_reports(
      { body: { perPage: 0, page: 0 } },
      mockResponse()
    );

    expect(ReportModel.getReports).toBeCalled();
  });
});
