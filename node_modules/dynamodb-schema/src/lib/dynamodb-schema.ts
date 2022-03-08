import Config from './config/config'
import TableBuilder, { CreateType } from "./table/table-builder"
import ParserSchema from './schema/parser-schema' 
import logger from '../log';
import Schema from '../lib/schema/Schema'
var prettyjson = require('prettyjson');
export class SchemaBuilder {
    
    private static tableBuilder: TableBuilder = new TableBuilder();

    public schema(schema: Schema[]): void {
        const newC = {
            schema: schema
        }
        Config.setConfig((<any>Object).assign({}, Config.getConfig().schema, newC));
    }

    public config(config: Config): void{
        Config.setConfig((<any>Object).assign({}, Config.getConfig(), config));
    }

    constructor(){
        
    }

    public createSchema(): Promise<any> {
        logger.info('Creating new schema...');
        logger.debug('Schema information: ', Config.getConfig());
        const schema = ParserSchema.parse(Config.getConfig().schema);
        logger.debug('Schema AWS parse: ', prettyjson.render(schema));
        return SchemaBuilder.tableBuilder.createSchema(CreateType.IGNORE, schema);
    }

    public dropSchema(): Promise<any> {
        logger.info('Drop Schema...');
        logger.debug('Schema information: ', Config.getConfig());
        const schema = ParserSchema.parse(Config.getConfig().schema);
        logger.debug('Schema AWS parse: ', prettyjson.render(schema));
        return SchemaBuilder.tableBuilder.deleteSchema(schema);
    }
}

const sb = new SchemaBuilder();


export default {
    config: sb.config,
    schema: sb.schema,
    createSchema: sb.createSchema,
    dropSchema: sb.dropSchema
};