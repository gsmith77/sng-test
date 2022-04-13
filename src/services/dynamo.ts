import AWS from 'aws-sdk';
import https from 'https';
import {DynamoDBConfigOptions} from '../types';

const createDynamoOptions = () => {
  const options: DynamoDBConfigOptions = {
    region: 'us-west-2',
    httpOptions: new https.Agent({
      keepAlive: true,
      maxSockets: Infinity,
    }),
    convertEmptyValues: true,
  };

  return new AWS.DynamoDB.DocumentClient(options);
};

export const dynamo = (() => createDynamoOptions())();
