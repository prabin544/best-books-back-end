'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

const User = require('./models/User')

const newUser = new User({
    name: 'Prabin',
    email: 'pravin544@gmail.com', 
    books: [
      {name: ['JS Expert', 'Express Expert']}, 
      {description: ['Zero to Hero', "Foundation"]}, 
      {status: [true, false]}
     
    ]
  });

console.log({newUser})
newUser.save();

app.get('/', (request, response) => {
    // when we get that request, send a response that says 'hello!'
    // response has some methods that are very helpful, such as a send method
    response.send('hello! from best-books backend');
  });

app.get('/books', getAllUsers)

function getAllUsers(request, response) {
  const name = request.query.name;
  console.log({name});
  User.find({name}, (err, person) => {
    if(err) return console.error(err);
    console.log({person})
    response.send(person[0].books);
  })
}

// app.get('/books', (request, response) => {
//   console.log("This should show books")
//   User.find(function (err, users) {
//     if (err) return console.error(err);
//     console.log(users);
//     response.send(users);
//   })

// });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 