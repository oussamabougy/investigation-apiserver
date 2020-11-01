'use strict'
const app = require('../src/app')
const fs = require('fs')
// supertest allows to easily test web apis
const request = require('supertest')
// uuid is used to create unique ids
const uuid = require('uuid')

// Define the PORT
const PORT = 3001

let server

describe('testing-server-routes', () => {
    const investigations = [
        {
            id: 1,
            name: 'enquête1'
        },
        {
            id: 2,
            name: 'enquête2'
        },
        {
            id: 3,
            name: 'enquête3'
        }
    ]
    beforeAll(async () => {
        //Create a file with content
        const data_result = JSON.stringify(investigations)
        await fs.writeFile('src/data/investigation.json', data_result, (err) => {
            if (err) {
                throw err
            }
        })
        server = app.listen(PORT) //Start server
    })

    afterAll(() => {
        server.close(() => {
            // Close connexion to serer
        })
    })

    // test get all investigations
    it('GET /investigations - success', async () => {
        const res = await request(app).get('/api/investigations')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(investigations)
    })

    // test get one investigation
    it('GET /investigation - success', async () => {
        const investigation = investigations[0]
        const res = await request(app).get(`/api/investigations/${investigation.id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(investigation.name)
    })

    // test get non-existent investigation
    it('GET /investigation - failure', async () => {
        const id = uuid.v4()
        const res = await request(app).get(`/api/investigations/${id}`)
        expect(res.statusCode).toBe(404)
    })

    // test create a new investigation
    it('POST /investigation - success', async () => {
        let res_investigations = await request(app).get('/api/investigations')
        const old_length_investigations = res_investigations.body.length

        const investigationObj = {
            name: 'Montgomery',
        }
        const res = await request(app).post('/api/investigations').send(investigationObj)
        res_investigations = await request(app).get('/api/investigations')
        const new_length_investigations = res_investigations.body.length

        expect(res.statusCode).toBe(201)
        expect(res.body.investigation.name).toEqual(investigationObj.name)
        expect(new_length_investigations).toBe(old_length_investigations + 1)
    })

    // test create a new investigation without a name
    it('POST /investigation - success', async () => {
        const investigationObj = {}
        const res = await request(app).post('/api/investigations').send(investigationObj)
        expect(res.statusCode).toBe(400)
    })
})