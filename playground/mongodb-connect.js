// const MongoClient = require('mongodb').MongoClient;
//this code is identical to the code above
//const {MongoClient} = require('mongodb');

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('could not connect to mongo db' + err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('Todoapp');
/* 
    db.collection('Todos').insertOne({
        text: 'Something to do',
        complete: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err)
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

    /* db.collection('Users').insertOne({
        name: 'Bill',
        age: 40,
        location: 'Colorado'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert user', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    }) */

    client.close();
});