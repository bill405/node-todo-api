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

//remove everthing need the {}
/* Todo.remove({}).then((result) => {
    console.log(result);
}).catch(e => console.log(e)); */

//find one and remove and get it back
//Todo.findOneAndRemove

Todo.findByIdAndRemove('5bb0f116644d257453101ca4').then(todo => {
    console.log('todo removed', todo);
}).catch(e => console.log(e));

