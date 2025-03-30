const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const receiverRoutes = require("./routes/receiverRoutes");
require("./services/scheduler");
const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");
const app = express();
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

app.use(express.json());

// URI MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use("/api", receiverRoutes);

app.get("/", (req, res) => {
  res.send("Pub/Sub Microservices App is running!");
});

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger-output.json"), "utf-8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
