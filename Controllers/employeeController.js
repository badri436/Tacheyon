const AWS = require('aws-sdk')
const config = require('../config/config')
const fs = require('fs')
AWS.config.update({
    region: config.aws_local_config.region,
    endpoint: config.aws_local_config.endpoint,
    accessKeyId: config.aws_local_config.accessKeyId,
    secretAccessKey: config.aws_local_config.secretAccessKey,
});

var docClient = new AWS.DynamoDB.DocumentClient();

const dynamoDb = new AWS.DynamoDB();


const employeeDetails = JSON.parse(fs.readFileSync('EmployeeData.json', 'utf-8'));

const createTable = async (req, res) => {
    var params = {
        TableName: config.aws_table_name,
        KeySchema: [
            { AttributeName: "employeeId", KeyType: "HASH" },  //Partition key
            // { AttributeName: "name", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "employeeId", AttributeType: "N" },
            // { AttributeName: "name", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    dynamoDb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

}


const addEmployee = async (req, res) => {

    employeeDetails.forEach(ele => {
        // Object.keys(ele).forEach((key) => {
        // console.log(key, ":", ele[key])

        var params = {
            TableName: config.aws_table_name,
            Item: {
                // key: ele[key]
                "employeeId": ele.id,
                "name": ele.name,
                "email": ele.email,
                "password": ele.password,
                "about": ele.about,
                "token": ele.token,
                "country": ele.token,
                "location": ele.location,
                "lng": ele.lng,
                "lat": ele.lat,
                "dob": ele.dob,
                "gender": ele.gender,
                "userType": ele.userType,
                "userStatus": ele.userStatus,
                "profilePicture": ele.profilePicture,
                "coverPicture": ele.coverPicture,
                "enablefollowme": ele.enablefollowme,
                "sendmenotifications": ele.sendmenotifications,
                "sendTextmessages": ele.sendTextmessages,
                "enabletagging": ele.enabletagging,
                "createdAt": ele.createdAt

            }
        };

        console.log("Adding a new item...");
        docClient.put(params, (err, data) => {
            if (err) {
                console.error("unable to add", err)
            } else {
                console.log("Added")
            }
        })

    })
    res.json("added")

}

const getEmployee = async (req, res) => {
    var params = {
        TableName: config.aws_table_name,
    };

    let scanResults = [];
    let items;
    // do {
    items = docClient.scan(params, (err, data) => {
        if (err) {
            res.status(400).json({
                "status": "Error",
                "message": err
            })
        } else {
            data.Items.map((item) => scanResults.push(item))
            res.status(200).json({ "status": "Success", "data": scanResults })

        }

    })

}

const getSpecificEmployee = async (req, res) => {
    let { id } = req.body
    console.log(id)
    var params = {
        Key: {
            "employeeId": id,

        },
        TableName: config.aws_table_name
    };
    docClient.get(params, (err, data) => {
        if (err) {
            res.status(400).json({
                "status": "Error",
                "message": err
            })
        } else {
            res.status(200).json({ "status": "Success", "data": data.Item })
        }
    })

}

const updateEmployee = async (req, res) => {
    const { id, name, email, password } = req.body

    const params = {
        TableName: config.aws_table_name,
        Item: {
            "employeeId": { "N": id },
            "name": { "S": name },
            "email": { "S": email },
            "password": { "S": password }
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    dynamoDb.putItem(params, function (err) {
        if (err) {
            res.status(400).json({
                "status": "Error",
                "message": err
            })
        } else {
            res.status(200).json({ "message": `Updated ${name} for id of ${id}` });
        }
    });

}

const deleteEmployee = async (req, res) => {
    const { id } = req.body
    const params = {
        TableName: config.aws_table_name,
        Key: {
            "employeeId": { "N": id },
        },
    };

    dynamoDb.deleteItem(params, function (err) {
        if (err) {
            res.status(400).json({
                "status": "Error",
                "message": err
            })
        } else {
            res.status(200).json({ "message": `Deleted id: ${id}` });
        }
    });
    // const params = {
    //     TableName: config.aws_table_name
    // }
    // dynamoDb.deleteTable(params, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(data.TableDescription)
    //     }
    // })
}
module.exports = { addEmployee, getEmployee, createTable, getSpecificEmployee, updateEmployee, deleteEmployee }