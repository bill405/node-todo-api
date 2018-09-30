require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

 

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
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(id)
    .then(todo => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    })
    .catch(e => res.status(400).send());
});

app.patch(`/todos/:id`, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true})
        .then(todo => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        })
        .catch(e => res.status(400).send());

})

app.listen(port, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log(`started on port ${port}`)
});

module.exports = {
    app
};