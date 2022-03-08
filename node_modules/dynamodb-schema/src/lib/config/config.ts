import * as AWS from 'aws-sdk';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { APIVersions, Config } from 'aws-sdk/lib/config';
import Schema from '../schema/Schema';

export interface Configuration {
    AWS?: {
        config: Config & ConfigurationServicePlaceholders & APIVersions
    },
    override?: Boolean,
    preffix?: String,
    subffix?: String,
    skipTables?: Array<String>,
    schema?: Schema[]
}

class Configurator { 
    
    constructor(){};

    private static config: Configuration = {
        override: true,
        preffix: '',
        subffix: ''
    }

    static getConfig(): Configuration {
        return Configurator.config;
    };

    static setConfig(configurator: Configuration): void {
        Configurator.config = (<any>Object).assign({}, Configurator.config, configurator);
    };



}



export default Configurator;