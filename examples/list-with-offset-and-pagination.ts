import {getPaginatedResults} from "./paginator";
import {ddb, TABLE_NAME} from "./client";

async function runMe() {

    const offset = 10_000;
    const pageSize = 20_000;

    const ddbQueryParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk and sk > :sk',
        ExpressionAttributeValues: {
            ':pk': 'my-partition',
            ':sk': offset,
        },
    };

    const records = await getPaginatedResults(async (ExclusiveStartKey, count: number) => {
        const queryResponse = await ddb
            .query({ExclusiveStartKey, ...ddbQueryParams })
            .promise();

        if (count + queryResponse.Count >= pageSize) {
            return {
                results: queryResponse.Items.slice(0, pageSize - count),
                marker: null,
            };
        }

        return {
            marker: queryResponse.LastEvaluatedKey,
            results: queryResponse.Items,
            count: count + queryResponse.Count,
        };
    });

    console.log('last item', records.sort((a, b) => a - b)[records.length - 1]);
}

runMe().then(() => console.log('Done'));