import DynamoDBConnector from "../connector/dynamo-connector";
import { PromiseResult } from "aws-sdk/lib/request";
import logger from '../../log';
export enum CreateType{
    OVERRIDE = 'OVERRIDE',
    IGNORE = 'IGNORE',

}

export default class TableBuilder {

    dbConnector: AWS.DynamoDB;

    constructor(){
        this.dbConnector = new DynamoDBConnector().connect();
    }

    create(typeCreration: CreateType, tableSchema: AWS.DynamoDB.CreateTableInput): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            logger.debug("Create table: " + tableSchema.TableName);
            try {
                const params: AWS.DynamoDB.DeleteTableInput = { TableName: tableSchema.TableName };
                if (typeCreration === CreateType.OVERRIDE) {
                    logger.debug("Override tables if exist");
                    const table = await this.dbConnector.waitFor('tableExists', params).promise();
                    if (table) {
                        const deleteTable = await this.delete(tableSchema.TableName);
                    }
                    const createTable = await this.dbConnector.createTable(tableSchema).promise();
                    resolve(createTable);
                } else {
                    logger.debug("keep tables if exist");
                    const table = await this.dbConnector.waitFor('tableNotExists', params).promise();
                    const createTable = await this.dbConnector.createTable(tableSchema).promise();
                    resolve(createTable);

                }
            } catch (error) {
                reject(error);
            }
        });

        // logger.debug('create tableSchema', tableSchema );
        // return new Promise((resolve, reject) => {
        //     logger.debug("Creando tabla " + tableSchema.TableName);
        //     if (typeCreration === CreateType.OVERRIDE) {
        //         logger.debug("Override tables if exist");
        //         this.describe(tableSchema.TableName).then( table => {
        //             logger.debug("table does exists, deleting table...");
        //             this.delete(tableSchema.TableName).then(deleted => {
        //                 logger.debug("table deleted, creating table");
        //                 this.dbConnector.createTable(tableSchema).promise().then( table => {
        //                     resolve(table);
        //                 }).catch( (err: Error) => {
        //                     reject(err)
        //                 });
        //             }).catch(err => {
        //                 reject(new Error("Error deleting table " + tableSchema.TableName));
        //             });
        //         }).catch(err => {
        //             logger.debug("table doesnt exists, creating table");
        //             this.dbConnector.createTable(tableSchema).promise().then(table => {
        //                 resolve(table);
        //             }).catch((err: Error) => {
        //                 reject(err)
        //             });
        //         });
        //     }else{
        //         logger.debug("keep tables if exist");
        //         this.describe(tableSchema.TableName).catch( (err: Error) => {
        //             this.dbConnector.createTable(tableSchema).promise().then(table => {
        //                 resolve(table);
        //             }).catch((err: Error) => {
        //                 reject(err)
        //             });
        //         });
        //     }
        // });       
    }

    createSchema(typeCreration: CreateType, schema: AWS.DynamoDB.CreateTableInput[]): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            let createStatus: Array<Promise<any>> = new Array<Promise<any>>();
            schema.forEach(table => {
                createStatus.push(this.create(typeCreration, table))
            });

            Promise.all(createStatus).then(deletions => {
                resolve(deletions);
            }).catch(err => {
                reject(err);
            });
        });
    }

    delete(tableName: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            logger.debug("deleting table " + tableName);
            try {
                const params: AWS.DynamoDB.DeleteTableInput = { TableName: tableName };
                const table = await this.dbConnector.waitFor('tableExists', params).promise();
                const deleteTable = await this.dbConnector.deleteTable(params).promise();
                resolve(deleteTable);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteSchema(schema: AWS.DynamoDB.CreateTableInput[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let deteleStatus: Array<Promise<any>> = new Array<Promise<any>>();
            schema.forEach(table => {
                deteleStatus.push(this.delete(table.TableName))
            });

            Promise.all(deteleStatus).then(deletions => {
                resolve(deletions);
            }).catch(err => {
                reject(err);
            });
        });
    }

    describe(tableName: string): Promise<any> {
        let params: AWS.DynamoDB.DescribeTableInput = { TableName: tableName };
        return this.dbConnector.describeTable(params).promise();
    }
}

