let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

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

app.listen(3000, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log('started on port 3000')
});
