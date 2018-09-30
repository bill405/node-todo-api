const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');
const {
    User
} = require('./../server/models/user');

let id = '5bb03d0be5515b6dbc9510ba';
let userID = '5bb01386d0adb96a09dd6724';

if (!ObjectID.isValid(id)) {
    console.log('id is not valid')
};

Todo.find({
        _id: id
    })
    .then((todos) => {
        console.log('Todos', todos);
    });

Todo.findOne({
        _id: id
    })
    .then((todo) => {
        console.log('Todo', todo);
    });


Todo.findById(id).then((todo) => {
        if (!todo) {
            return console.log('id not found!');
        }
        console.log('Todo by id', todo);
    })
    .catch(e => console.log(e));

//USER

User.findById(userID).then(user => {
    if (!user) {
        return console.log('no user by that id');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch(e => console.log(e));