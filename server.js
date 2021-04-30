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
    name: 'Prabin Singh',
    email: 'pravin544@gmail.com', 
    books:
      [
        {
          name: 'JS Expert',
          description: 'Zero to Hero',
          status: 'published'
        },

        {
          name: 'Express Expert',
          description: 'Zero to Hero',
          status: 'published'
        },

        {
          name: 'Node Expert',
          description: 'Zero to Hero',
          status: 'published'
        },
 
      ]
    })

const secondUser = new User({
  name: 'Alex',
  email: 'pravin544@gmail.com', 
  books:
    [
      {name: 'JS Expert',
      description: 'Zero to Hero',
      status: 'published'},

      {name: 'Express Expert',
      description: 'Zero to Hero',
      status: 'published'},

    ]
  })

console.log({newUser})
newUser.save();
secondUser.save();

app.get('/', (request, response) => {
    response.send('hello! from best-books backend');
  });

app.get('/books', getAllUsers)

function getAllUsers(request, response) {
  console.log(request)
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