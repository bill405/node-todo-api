
const jwt = require('jsonwebtoken');

let data = {
    id: 10
}

//takes your object and your secret
let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

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