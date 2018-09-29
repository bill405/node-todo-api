// const MongoClient = require('mongodb').MongoClient;
//this code is identical to the code above
//const {MongoClient} = require('mongodb');

const {
    MongoClient,
    ObjectID
} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('could not connect to mongo db' + err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('Todoapp');

    db.collection('Users')
        .find({
            name: 'Bill'
        })
        .toArray()
        .then(docs => {
            console.log("Docs with the name Bill:")
            console.log(JSON.stringify(docs, undefined, 2));
        }, err => console.log('There was an error!', err));


    /* db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log(`Todos count: ${count}`);
        }, err => console.log('cannot get todos', err));
    */ 
    
        /* db.collection('Todos')
        .find({
            _id: new ObjectID("5bafecfb2563df550b75b451") 
        })
        .toArray()
        .then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, err => console.log('cannot get todos', err)); */

    //client.close();
});