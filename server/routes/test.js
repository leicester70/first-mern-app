const express = require('express')
const testRoutes = express.Router()
const dbo = require('../database/conn')
const ObjectId = require('mongodb').ObjectId

// Get all
testRoutes.route('/test').get((req, res) => {
    let db_connect = dbo.getDb("testing")
    db_connect
        .collection("test_collection")
        .find({})
        .toArray((err, result) => {
            if (err) { throw err }
            res.json(result)
        })
})

// Create by ID

module.exports = testRoutes