# Node.js Microservices with Express, Mongoose, AWS SQS, JWT, and Docker

This repository demonstrates a scalable PubSub microservices architecture implemented using **Node.js**, **Express.js**, **Mongoose**, **AWS SQS**, **JWT middleware**, and deployed via **Docker** and **AWS Elastic Beanstalk**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

This project consists of two services:

1. **Receiver Service**: Accepts secure POST requests containing user data, validates the payload, and stores it in a MongoDB database.
2. **Listener Service**: Listens to events published by the Receiver service via AWS SQS, processes the event, and persists the data in a second MongoDB collection.

The system is fully dockerized, enabling scalability and easy deployment on **Elastic Beanstalk**.

---

## Features

- **Secure Data Handling**: JWT-based authentication middleware ensures secure access.
- **Data Validation**: Built-in validation for incoming JSON payloads.
- **Asynchronous Communication**: Implements the PubSub model using AWS SQS.
- **Scalable Architecture**: Designed to support multiple pods/containers.
- **Database Support**: Integrated with **MongoDB** for data persistence.
- **Time-Stamped Records**: Captures both `inserted_at` and `modified_at` timestamps for data records.

---

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Message Queue**: AWS SQS
- **Authentication**: JWT (JSON Web Token)
- **Containerization**: Docker
- **Others**: uuid for unique identifiers, dotenv for environment variable management
- **Docker Image Repository**: Amazon Elastic Container Registry (ECR) is used for storing docker images of the application.
- **Deployment**: AWS Elastic Beanstalk

---

## Setup and Installation

### Prerequisites

Ensure the following tools are installed:

- Node.js (v16+)
- Docker
- MongoDB (local or cloud instance)
- AWS CLI (configured with IAM credentials)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/gururani1997/PubSubMicroService
   ```
2. Install dependencies
   npm install

3. Start MongoDB (Cloud/Local Instance)

4. Configure environment variables

   # Application

   PORT=3000

5. Build and run Docker containers

6. Architecture

   1. Receiver Service:
      Validates incoming payload.
      Stores validated data in the first MongoDB collection.
      Publishes an event to AWS SQS.
   2. Listener Service:
      Subscribes to the AWS SQS queue.
      Retrieves and processes messages.
      Saves the data to the second MongoDB collection with modified_at timestamp.

7. Deployment

   1. Docker
      Build the Docker image
   2. Push the Docker image to AWS ECR

8. Elastic Beanstalk
   1. Create an Elastic Beanstalk application.
   2. Upload the Docker image via ECR.
   3. Set up environment variables in Elastic Beanstalk configuration.
   4. Deploy and test the services.
