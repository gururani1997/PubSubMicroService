const swaggerAutogen = require("swagger-autogen")();
const fs = require("fs");
const path = require("path");
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/receiverRoutes.js"];
require("dotenv").config();
console.log("process.env.SWAGGER_URL", process.env.SWAGGER_URL);
const swaggerOptions = {
  servers: [
    {
      url: "http://" + process.env.SWAGGER_URL_HOST + "api",
    },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Bearer token for authentication. Example: `Bearer YOUR_TOKEN`",
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
  console.log("Swagger specification generated!");
  const swaggerSpec = JSON.parse(fs.readFileSync(outputFile, "utf-8"));

  swaggerSpec.host = process.env.SWAGGER_URL_HOST + "api";
  swaggerSpec.basePath = "/";
  fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));
});
