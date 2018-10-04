const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token) {
    let user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

//note this is a model method, so it is static, since it is static
UserSchema.statics.findByToken = function(token) {
    //since this method is unrelated to a user, we use U 
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    let User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                //returns true or false if the password is the same or different
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
             
        });
    });
};

//Mongoose middleware that hashes the password before it is stored
//https://mongoosejs.com/docs/middleware.html
UserSchema.pre('save', function (next) {
    let user = this;

    //don't hash your hash
    //is modified returns true if modified 
    //if the password was modified, we want to call our bycrpt hash
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.log(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});


let User = mongoose.model('User', UserSchema);

module.exports = {User}