'use strict'
const express = require('express')
const router = new express.Router()

const investigationController = require('./controllers/investigation.controller')

// Retrieve all investigations
router.get('/', investigationController.findAll)

// Create a new investigation
router.post('/', investigationController.create)

// Retrieve a single investigation with id
router.get('/:id', investigationController.findOne)

module.exports = router