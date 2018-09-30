let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {
    mongoose
} = require('./db/mongoose');
let {
    Todo
} = require('./models/todo');
let {
    User
} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    new Todo({
            text: req.body.text
        })
        .save()
        .then(
            doc => res.status(200).send(doc),
            err => res.status(400).send(err)
        )
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
            res.send({
                todos
            })
        }),
        e => res.status(400).send(e);
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    //validate id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //query db find by id
    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            //send todo as an object {todo} is equal to {todo:todo} in es6
            return res.status(200).send({todo});
        })
        .catch(e => res.status(400).send());
});

app.listen(3000, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log('started on port 3000')
});

module.exports = {
    app
};