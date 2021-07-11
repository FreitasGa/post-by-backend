export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            body = await lambda(event, context);
            statusCode = 200;
        } catch (error) {
            console.log(error);
        }

        return {
            statusCode,
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': false,
                'Access-Control-Allow-Headers':
                    'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
                'Access-Control-Allow-Methods':
                    'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
                'X-Requested-With': '*',
            },
        };
    };
}
