const express = require('express')
const testRoutes = express.Router()
const dbo = require('../database/conn')
const ObjectId = require('mongodb').ObjectId

// Get all
testRoutes.route('/test').get((req, res) => {
    let db_connect = dbo.getDb("testing")
    console.log(db_connect)
    db_connect
        .collection("test_collection")
        .find({})
        .toArray((err, result) => {
            if (err) { throw err }
            res.json(result)
        })
})

// This section will help you get a single test by id
testRoutes.route("/test/:id").get((req, res) => {
    let db_connect = dbo.getDb("testing");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("test_collection")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new test.
testRoutes.route("/test/add").post((req, response) => {
    let db_connect = dbo.getDb("testing");
    let payload = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("test_collection").insertOne(payload, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a test by id.
testRoutes.route("/update/:id").post((req, response) => {
    let db_connect = dbo.getDb("testing");
    console.log(req)
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("test_collection")
        .updateOne(myquery, newvalues, (err, res) => {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a test
testRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb("testing");
    let myquery = { _id: ObjectId(req.params.id) };
    console.log(myquery)
    db_connect.collection("test_collection").deleteOne(myquery, (err, obj) => {
        if (err) throw err;
        console.log(obj);
        response.json(obj);
    });
});

module.exports = testRoutes