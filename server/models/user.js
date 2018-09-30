const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator:  validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String, 
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

//these are instance methods
// note, we did not use an arrow function so we could bind this to the user
UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let userHex = user._id.toHexString();
    
    let access = 'auth';
    let token = jwt.sign({_id: userHex, access}, 'abc123').toString();
    
    user.tokens = user.tokens.concat([{access, token}]);
    console.log(JSON.stringify(user, undefined, 2));
    
    return user.save().then(() => {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User}