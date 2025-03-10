const { connect } = require('../config/database');

async function getData() {
    const db = await connect();
    const collection = db.collection('your_collection_name');
    
    // Thay đổi truy vấn SQL sang truy vấn MongoDB
    const data = await collection.find({}).toArray();
    console.log(data);
}

getData();
