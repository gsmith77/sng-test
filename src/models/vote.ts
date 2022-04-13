import {dynamo} from '../services/dynamo';
import {Nominee} from '../types';

const voteModel = {
  createVote: (
    awardName: string,
    category: string,
    firstName: string,
    fullName: string,
    lastName: string,
    year: string
  ) =>
    dynamo
      .put({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Item: {
          PK: `AWARD#${awardName}`,
          SK: `NOMINEE#${fullName}`,
          category,
          firstName,
          fullName,
          lastName,
          votes: 1,
          year,
        },
        ConditionExpression: 'attribute_not_exists(PK)',
      })
      .promise(),
  getAwareNominee: (awardName: string, fullName: string) =>
    dynamo
      .get({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Key: {
          PK: `AWARD#${awardName}`,
          SK: `NOMINEE#${fullName}`,
        },
      })
      .promise(),

  getAwardNomineesByYear: (awardName: string) =>
    dynamo
      .query({
        TableName: process.env.DYNAMO_TABLE_NAME,
        KeyConditionExpression: 'PK = :hkey and begins_with(SK, :skey)',
        ExpressionAttributeValues: {
          ':hkey': `AWARD#${awardName}`,
          ':skey': `NOMINEE#`,
        },
      })
      .promise(),
  updateAwardNomineeVote: (
    awardName: string,
    Item: Nominee,
    fullName: string
  ) =>
    dynamo
      .update({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Key: {
          PK: `AWARD#${awardName}`,
          SK: `NOMINEE#${fullName}`,
        },
        UpdateExpression: 'set votes = :a',
        ExpressionAttributeValues: {
          ':a': Item?.votes + 1,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise(),
};

export default voteModel;
