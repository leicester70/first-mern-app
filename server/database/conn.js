const { MongoClient, ServerApiVersion } = require('mongodb');

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if (db) { _db = db.db("testing"); console.log("Successfully connected to MongoDB."); }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};