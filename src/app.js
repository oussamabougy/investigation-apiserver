'use strict'
const express = require('express')
// create express app
const app = express()

const bodyParser = require('body-parser')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require investigations routes
const investigationRoutes = require('./routes')
// using as middleware
app.use('/api/investigations', investigationRoutes)

module.exports = app