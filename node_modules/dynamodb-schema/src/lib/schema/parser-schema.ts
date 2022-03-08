import Schema, { Atribute, KeySchema, Throughput } from "./Schema";

enum TABLE_BUILDER {
    TableName =  'TableName',
    AttributeDefinitions = 'AttributeDefinitions',
    KeySchema = 'KeySchema'
}
enum TABLE_ATTRIBUTE_BUILDER {
    AttributeName =  'AttributeName',
    AttributeType = 'AttributeType'
}

export default class ParserSchema {
    private static defaultReadThrougput = 5
    private static defaultWriteThrougput = 5
    static parse(schema: Schema[] | undefined): any {
        if (schema == undefined) {
            return null;
        }
        let tables:  Array<Object> = new Array<Map<string, any>>();
        schema.forEach(it => {
            tables.push({
                AttributeDefinitions: this.getAtrribute(it.attributtes),
                KeySchema: this.getKeySchema(it.keys),
                TableName: it.name, 
                ProvisionedThroughput: this.getThroughput(it.throughput)
            });
        });
        return tables;

    }

    private static getKeySchema(atributes: KeySchema[]): Array<any> {
        const _atributes: Array<any> = new Array<any>();
        atributes.forEach(it => {
            let attributeLocal = {
                AttributeName: it.name,
                KeyType: this.getValueOfKey(it.type)
            };
            _atributes.push(attributeLocal);
        });
        //console.log('getKeySchema [ ',  _atributes);
        return _atributes;
    }
    private static getThroughput(throughput: Throughput | undefined): any {
       return {
        ReadCapacityUnits: throughput ? throughput.read : ParserSchema.defaultReadThrougput,
        WriteCapacityUnits: throughput ? throughput.write : ParserSchema.defaultWriteThrougput

       }
    }

    private static getAtrribute(atributes: Atribute[]): Array<any> {
        const _atributes: Array<any> = new Array<any>();
        atributes.forEach(it => {
            let attributeLocal = {
                AttributeName: it.name,
                AttributeType: this.getValueOfAtribute(it.type)
            };
            _atributes.push(attributeLocal);
        });
        //console.log('getAtrribute [ ', _atributes);
        return _atributes;
    }

    private static getValueOfKey(type: String): String {
        let attribute = 'HASH';
        switch(type.toLowerCase().trim()) {
            case 'hash': 
                attribute = 'HASH';
            break;
            case 'range': 
                attribute = 'RANGE';
            break;
        }
        return attribute;
    }

    private static getValueOfAtribute(type: String): String {
        let attribute = 'S';
        switch(type.toLowerCase().trim()) {
            case 'string': 
                attribute = 'S';
            break;
            case 'boolean': 
                attribute = 'S';
            break;
            case 'number': 
                attribute = 'N';
            break;
            case 'list': 
                attribute = 'SS';
            break;
        }
        return attribute;
    }

    
}