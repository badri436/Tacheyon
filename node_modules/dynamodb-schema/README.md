# dynamodb-schema

Dynamodb plugin to improve schema creation and manipulation, we can use as you can. 


[![Build Status](https://travis-ci.org/gibrancordoba/dynamodb-schema.svg?branch=master)](https://travis-ci.org/gibrancordoba/dynamodb-schema)  [![GitHub issues](https://img.shields.io/github/issues/gibrancordoba/dynamodb-schema.svg)](https://github.com/gibrancordoba/dynamodb-schema/issues)  [![GitHub forks](https://img.shields.io/github/forks/gibrancordoba/dynamodb-schema.svg)](https://github.com/gibrancordoba/dynamodb-schema/network)  [![GitHub release](https://img.shields.io/github/release/gibrancordoba/dynamodb-schema.svg)](https://github.com/gibrancordoba/dynamodb-schema/releases/tag/v0.0.11)  [![GitHub license](https://img.shields.io/github/license/gibrancordoba/dynamodb-schema.svg)](https://github.com/gibrancordoba/dynamodb-schema/blob/master/license.md) 

## Social us:

[![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/dynamodb-schema.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdynamodb-schema)

A Typescript Node.js package that create schemas on dynamoDb.

## Installation

First, install the package using npm:

```javascript
    npm install dynamo-schema --save
```

## Getting Started

You will need to import the node module into your file:

```javascript
    import dynamodbSchema from 'dynamodb-schema';
```

## Usage

### schema

```javascript
    dynamodbSchema.schema([
        {
            name: 'tableName',
            attributtes: [
                { name: 'columnKey',  type: 'String' },
                { name: 'column2Key',  type: 'String' }
            ],
            keys: [
                { name: 'columnKey',  type: 'HASH' },
                { name: 'column2Key', type: 'RANGE' }
            ],
            throughput: {
                read: 1,
                write: 1
            }
        }
    ]);
```

### createSchema

if you have been loaded informacion schema you only need to execute the following command to create schema.

```javascript
    dynamodbSchema.createSchema();
```

### dropSchema

if you have been loaded informacion schema you only need to execute the following command to drop schema.

```javascript
    dynamodbSchema.dropSchema();
```

### config

you can set config parameter into dynamodbSchema Object like the following example:


```javascript
    dynamodbSchema.config({
        override?: Boolean,
        preffix?: String,
        subffix?: String,
        schema: Array<Schema>,
    });
```

#### override

override property could have been used it in order to set into dynamodb-schema object if you want to overried tables if exist or not.

#### preffix

you can use this property to assign schema preffix table, dynamodbSchema  joins string before the table name into Schema object.

#### subffix

you can use this property to assign schema subffix table, dynamodbSchema  joins string after the table name into Schema object.

#### schema

you can use this property to assign schema information to the dynamodbSchema object.


### Data types schema support
| Type        | Dynamo Type  |
| ----------- |-------------:|
| String      | S            |
| Boolean     | S         |
| Number      | Number       |
| Array       | Map          |


## Links


## License

[Apache 2.0](https://github.com/gibrancordoba/dynamodb-schema/blob/master/license.md)

[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)