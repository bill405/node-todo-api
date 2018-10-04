
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

//don't store the password, store the hash
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

let hashedPassword = '$2a$10$Ft.niRHqbUTqzvvEhk0dI.2cbh1lDUh7ufkL9wVEQxXhj4xK5Kruq';

bcrypt.compare(password, hashedPassword, (err, res) => {
    //returns true or false if the password is the same or different
    console.log(res);
    //the process is, we take the password entered by the user
    //and compare it to the hashed value stored in the database.

});

/* 
let data = {
    id: 10
    
}
 */


//takes your object and your secret
/* let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
 */
//the standard is JWT this is so you understand how salt and hashing work...

/*  const {SHA256} = require('crypto-js');



let message = 'I am user # 2';

let hash = SHA256(message);

let data = {
    //id = the user id in the user colleciton
    id: 4
};

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

//sample man in the middle
token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString()

let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
    console.log('Data was not change');
    console.log(resultHash);
    console.log(token.hash);
} else {
    console.log('Data was changed do not trust');
    console.log(resultHash);
    console.log(token.hash);
} */