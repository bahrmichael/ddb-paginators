import {getPaginatedResults} from "./paginator";
import {ddb, TABLE_NAME} from "./client";

async function runMe() {
    const ddbQueryParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        FilterExpression: 'randomValue > :r',
        ExpressionAttributeValues: {
            ':pk': 'my-partition',
            ':r': 0.5,
        },
    };

    const records = await getPaginatedResults(async (ExclusiveStartKey) => {
        const queryResponse = await ddb
            .query({ExclusiveStartKey, ...ddbQueryParams })
            .promise();

        return {
            marker: queryResponse.LastEvaluatedKey,
            results: queryResponse.Items,
        };
    });

    console.log({records});
}

runMe().then(() => console.log('Done'));