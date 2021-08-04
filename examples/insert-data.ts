import {ddb, TABLE_NAME} from "./client";

const ITEM_COUNT = 100_000;

async function runMe() {
    console.log(`Preparing ${ITEM_COUNT} requests ...`);
    const requests = [];
    for (let i = 0; i < ITEM_COUNT; i++) {
        requests.push(ddb.put({
            TableName: TABLE_NAME,
            Item: {
                pk: `my-partition`,
                sk: i,
                createdAt: new Date().toISOString(),
                randomValue: Math.random(),
            }
        }).promise());
    }
    console.log('Inserting data ...');
    await Promise.all(requests);
}

runMe().then(() => console.log('Done'));