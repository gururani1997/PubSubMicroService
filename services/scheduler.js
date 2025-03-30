const { pollSQS } = require("./sqsManager");
const cron = require("node-cron");

cron.schedule("*/10 * * * * *", () => {
  console.log("Polling SQS...");
  pollSQS();
});
