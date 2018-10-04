let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        require: true,
        type: mongoose.Schema.Types.ObjectId
    }
});


module.exports = {Todo};