import { v4 } from 'uuid';
import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    const { userEmail, items, totalPrice, totalQuantity } =
        typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const params = {
        TableName: process.env.reserveTableName,
        Item: {
            reserveId: v4(),
            userId: event.requestContext.identity.cognitoIdentityId,
            userEmail,
            items,
            totalPrice,
            totalQuantity,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});
