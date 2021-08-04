import { DynamoDB } from 'aws-sdk';
// region must be the same as defined in ../tables/serverless.ts
export const ddb = new DynamoDB.DocumentClient({region: 'us-east-1'});
export const TABLE_NAME = 'paginator-examples-tables-dev-TokenTable-XXXXXXXXXX';