import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'paginator-examples-tables',
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    region: 'us-east-1'
  },
  resources: {
    Resources: {
      TokenTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          BillingMode: 'PAY_PER_REQUEST',
          KeySchema: [{
            AttributeName: 'pk',
            KeyType: 'HASH'
          }, {
            AttributeName: 'sk',
            KeyType: 'RANGE'
          }],
          AttributeDefinitions: [{
            AttributeName: 'pk',
            AttributeType: 'S'
          }, {
            AttributeName: 'sk',
            AttributeType: 'N'
          }],
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
