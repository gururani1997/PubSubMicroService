// Import the necessary classes from the AWS SDK v3
const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");

// Initialize an SQS client
const sqsClient = new SQSClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
const UserRedis = require("../models/userSchemaViaRedis");

exports.sendMessage = async (payload) => {
  try {
    const params = {
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify(payload),
    };
    const command = new SendMessageCommand(params);

    const data = await sqsClient.send(command);
    console.log("Success", data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

exports.pollSQS = async () => {
  try {
    const params = {
      QueueUrl: process.env.QUEUE_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    };

    const command = new ReceiveMessageCommand(params);
    const data = await sqsClient.send(command);

    if (data.Messages) {
      for (let message of data.Messages) {
        let data = JSON.parse(message?.Body);
        delete data["_id"];
        data["modified_at"] = new Date();
        console.log("Success", data);
        let user = new UserRedis(data);

        try {
          let isUserExist = await UserRedis.findOne({ email: data.email });
          if (!isUserExist) {
            const savedData = await user.save();
            if (savedData) {
              const deleteParams = {
                QueueUrl: process.env.QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle,
              };
              const deleteCommand = new DeleteMessageCommand(deleteParams);
              await sqsClient.send(deleteCommand);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      console.log("No messages received");
    }
  } catch (error) {
    console.error("Error receiving messages:", error);
  }
};
