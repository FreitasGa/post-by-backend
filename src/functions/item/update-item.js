import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const { itemId, quantity } =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const params = {
    TableName: process.env.itemTableName,
    Key: {
      itemId,
    },
    UpdateExpression: 'SET quantity = :quantity',
    ExpressionAttributeValues: {
      ':quantity': quantity,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
