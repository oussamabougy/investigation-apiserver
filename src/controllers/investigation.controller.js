'use strict'
// file manager
const fs = require('fs')
// uuid is used to create unique ids
const uuid = require('uuid')

const file_path = 'src/data/investigation.json'

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    fs.readFile(file_path, (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal Error has Occurred' })
        }
        const investigations = JSON.parse(data)
        res.json(investigations)
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    fs.readFile(file_path, (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal Error has Occurred' })
        }
        const investigations = JSON.parse(data)
        const investigation = investigations.find(inves => inves.id == id)
        if (investigation) {
            res.json(investigation).status(200)
        } else {
            res.status(404).json({ message: `Investigation with id= ${id} does not exist` })
        }
    })
}

// Create and Save a new investigation
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.name) {
        return res.status(400).send({
            message: 'Please fill all required fields'
        })
    }
    // Create a new investigation
    fs.readFile(file_path, async (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal Error has Occurred' })
        }
        const investigations = JSON.parse(data)
        const id = uuid.v4()
        const inves = { id, name: req.body.name }
        investigations.push(inves)
        const data_result = JSON.stringify(investigations)
        await fs.writeFile(file_path, data_result, (er) => {
            if (er) {
                res.status(500).json({ message: 'Internal Error has Occurred' })
            }
        })
        res.status(201).json({ investigation: inves, message: 'Investigation has been saved successfully' })
    })
}