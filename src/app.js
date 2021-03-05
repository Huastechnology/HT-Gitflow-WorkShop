const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes/user.routes')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes
app.use('/v1', api)

module.exports = app