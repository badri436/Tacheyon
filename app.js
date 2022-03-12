const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const employeeRoutes = require('./Routes/employeeRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/employee', employeeRoutes)


app.listen(4000, () => {
    console.log("server is running")
})