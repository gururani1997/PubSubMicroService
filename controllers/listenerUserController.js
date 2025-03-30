const Data = require("../models/userSchemaViaRedis");

exports.receiveEvent = async (data) => {
  try {
    const newData = { ...data, modified_at: new Date() };
    const copiedData = new Data(newData);
    await copiedData.save();
    console.log("Data copied to second table:", copiedData);
  } catch (err) {
    console.error("Failed to copy data:", err);
  }
};
