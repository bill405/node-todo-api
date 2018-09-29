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
        .findOneAndUpdate(
            {_id: new ObjectID('5baff9e62563df550b75b946')},
            {
                $inc: {age: +54},
                $set: {name: 'Billy'}
            },
            {returnOriginal: false}
        )
        .then((err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result);
        })
});



/*     db.collection('Todos')
        .findOneAndUpdate({
            _id: new ObjectID('5baffd612563df550b75ba0e')
        }, {
            $set: {
                complete: true
            }
        }, {
            returnOriginal: false
        })
        .then((err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        }); */