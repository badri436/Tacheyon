import { instance, mock, reset, when } from 'ts-mockito';
import ParserSchema from '../../src/lib/schema/parser-schema';
import DynamoDBSchema from '../../src/lib/dynamodb-schema';
import { expect } from 'chai';
import logger from '../../src/log'
describe('Dynamodb-schema module', () => {
    
    let parserSchema: ParserSchema = new ParserSchema();
    let schema = ([
        {
            name: 'table1',
            attributtes: [
                { name: 'user',  type: 'String' },
                { name: 'name',  type: 'String' }
            ],
            keys: [
                { name: 'user',  type: 'HASH' },
                { name: 'name', type: 'RANGE' }
            ],
            throughput: {
                read: 1,
                write: 1
            }
        },
        {
            name: 'table2',
            attributtes: [
                { name: 'user', type: 'String' },
                { name: 'name', type: 'String' }
            ],
            keys: [
                { name: 'user', type: 'HASH' },
                { name: 'name', type: 'RANGE' }
            ],
            throughput: {
                read: 1,
                write: 1
            }
        }
    ]);

    before(() => {
        console.log('init');
        DynamoDBSchema.schema(schema);
    
    });

    describe('Should exec all function module dynamodb-schema', function() {
        this.timeout(160000);
        it('Should create schema', async () => {
            try {
                const creations = await DynamoDBSchema.createSchema();
                console.log("creations: ", creations);
                expect(creations).length.greaterThan(0);      
            } catch (error) {
                console.error("ERROR: ", error);
            }
        });

        it('Should drop schema', async () => {
            
            try {
                const deletions = await DynamoDBSchema.dropSchema();
                console.log("deletions: ", deletions);
                expect(deletions).length.greaterThan(0); 
            } catch (error) {
                console.error("ERROR: ", error);
            }
        });
    });

});