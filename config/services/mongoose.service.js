"use strict";

const logger = require("../components/winston.logger.js");
const mongoose = require("mongoose");
const DataFetcher = require("../../utils/data/fetcher.js");

mongoose.set("strictQuery", false);

const options = {
  autoIndex: false, // Don't build indexes
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connect() {
  logger.info("MongoDB connection with retry");
  await mongoose.connect(
    `mongodb://${process.env.MONGOOSE_SERVER_ADDRESS}:${process.env.MONGOOSE_SERVER_PORT}/spam-reporting-service`,
    options
  );
  logger.info("MongoDB is connected");

  mongoose.connection.once(
    "open",
    async (err, resp) => await DataFetcher.populateDatabase()
  );
}

connect().catch((err) => {
  logger.error(`MongoDB connection unsuccessful - ${err}`);
});

exports.mongoose = mongoose;
