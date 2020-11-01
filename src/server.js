'use strict'
const app = require('./app')

// Setup server port
const PORT = process.env.PORT || 3000

app.listen(PORT)