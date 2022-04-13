const dynamo = require('./dynamo');

const createVote = async ctx => {
  const {awardName, category, firstName, fullName, lastName, year} =
    ctx.request.body;
  if (
    !awardName ||
    !category ||
    !firstName ||
    !fullName ||
    !lastName ||
    !year
  ) {
    return ctx.throw(400, 'Invalid request: Missing values');
  }

  const data = await dynamo
    .get({
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        PK: `AWARD#${awardName}`,
        SK: `NOMINEE#${fullName}`,
      },
    })
    .promise();

  if (data?.Item?.votes) {
    await dynamo
      .update({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Key: {
          PK: `AWARD#${awardName}`,
          SK: `NOMINEE#${fullName}`,
        },
        UpdateExpression: 'set votes = :a',
        ExpressionAttributeValues: {
          ':a': data.Item.votes + 1,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();
  } else {
    await dynamo
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
      .promise();
  }
  ctx.body = {
    data: 'Successfully created vote.',
  };
};

const getVotes = async ctx => {
  const {awardName} = ctx.request.params;
  const {year} = ctx.request.query;
  const {Items} = await dynamo
    .query({
      TableName: process.env.DYNAMO_TABLE_NAME,
      KeyConditionExpression: 'PK = :hkey and begins_with(SK, :skey)',
      ExpressionAttributeValues: {
        ':hkey': `AWARD#${awardName}`,
        ':skey': `NOMINEE#`,
      },
    })
    .promise();
  if (!Items?.length)
    ctx.throw(400, 'There are no nominees by this award and year.');
  // map over the nominee and push them into an array
  const nominees = [];
  Items.map(({category, firstName, lastName, votes, year: yearOfAward}) => {
    if (year === yearOfAward)
      nominees.push({category, firstName, lastName, votes});
  });
  ctx.body = {
    awardName,
    year,
    nominees,
  };
};

module.exports = {createVote, getVotes};
