import * as AWS from 'aws-sdk';

AWS.config.update({
    region: "us-east-1"
});

export default class DynamoDBConnector{

    private conn!: AWS.DynamoDB;

    constructor(conn?: AWS.DynamoDB){ 
        if (conn) {
            this.conn = conn;
        }
    }

    connect(){
        return new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        
    };

}