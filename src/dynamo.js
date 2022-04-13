const AWS = require('aws-sdk');
const https = require('https');

const createDynamoOptions = () => {
  const options = {};
  options.region = 'us-west-2';
  options.httpOptions = new https.Agent({
    keepAlive: true,
    maxSockets: Infinity,
  });
  options.convertEmptyValues = true;

  return new AWS.DynamoDB.DocumentClient(options);
};

const dynamo = (() => createDynamoOptions())();

module.exports = dynamo;
