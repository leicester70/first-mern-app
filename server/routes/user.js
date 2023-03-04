const express = require('express')
const userRoutes = express.Router()
const dbo = require('../database/conn')
const ObjectId = require('mongodb').ObjectId
const utils = require('./utils')
const userSchema = require('../schemas/user.json')

// Get all
userRoutes.route('/user').get((req, res) => {
    let db_connect = dbo.getDb("main")
    console.log(db_connect)
    db_connect.collection("user").find({}).toArray((err, result) => {
        if (err) { throw err }
        res.json(result)
    })
})

// This section will help you get a single user by id
userRoutes.route("/user/:id").get((req, res) => {
    let db_connect = dbo.getDb("main");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("user")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new user.
userRoutes.route("/user/add").post((req, response) => {
    let db_connect = dbo.getDb("main");
    let payload = {
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth
    }
    if (!utils.hasSchemaValidationErrors(payload, userSchema)) {
        return response.json({
            success: utils.hasSchemaValidationErrors(payload, userSchema),
            serverMessage: "Failed to add new user. Payload does not match user object schema. Please check shape of payload object.",
            payload: payload
        })
    }
    db_connect.collection("user").insertOne(payload, (err, res) => {
        if (err) throw err;
        response.json({
            success: true,
            payload: payload,
            databaseMessage: res
        });
    });
});

// This section will help you update a user by id.
userRoutes.route("/user/update/:id").post((req, response) => {
    let db_connect = dbo.getDb("main");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            emailAddress: req.body.emailAddress,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth
        },
    };
    if (utils.hasSchemaValidationErrors(newvalues.$set, userSchema)) {
        return response.json({ success: false, payload: payload })
    }
    db_connect.collection("user").updateOne(myquery, newvalues, (err, res) => {
        if (err) throw err;
        response.json({
            success: true,
            payload: payload,
            databaseMessage: res
        });
    });
});

// This section will help you delete a user
userRoutes.route("/user/:id").delete((req, response) => {
    let db_connect = dbo.getDb("main");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("user").deleteOne(myquery, (err, res) => {
        if (err) throw err;
        response.json({
            success: err ? false : true,
            databaseMessage: res
        });
    });
});

module.exports = userRoutes