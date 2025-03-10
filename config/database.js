const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db('your_database_name');
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connect };
