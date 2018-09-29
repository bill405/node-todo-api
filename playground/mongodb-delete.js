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

    //deleteMany
    /*  db.collection('Todos')
        .deleteMany({
            text: "Walk the cat"
        })
        .then((err, result) => {
            if (err) {
                console.log('there was an error: ', err);
            }
            console.log(result);
        });
 */
    //deleteOne
    //findOneAndDelete

/*     db.collection('Todos')
        .findOneAndDelete({
            completed: true
        })
        .then((result) => {
            console.log(result);
        }); */
/* 
        db.collection('Users')
        .deleteMany({
            name: 'Bill'
        })
        .then(result => console.log(result)); */

        db.collection('Users')
        .findOneAndDelete({
            _id: new ObjectID("5baffa442563df550b75b969")
            
        })
        .then((result) => {
            let deletedPerson = JSON.stringify(result, undefined, 2);
            console.log(`You deleted: ${deletedPerson}`);
        })

    //client.close();
});