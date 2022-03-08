const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const employeeRoutes = require('./Routes/employeeRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/employee', employeeRoutes)

app.listen(3000, () => {
    console.log("server is running")
})