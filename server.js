'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

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
newUser.save();
secondUser.save();

app.get('/', (request, response) => {
    // response.send('hello! from best-books backend');
    User.find((err, userData) => {
      response.send(userData);
    });
  });

app.get('/users/:email', (request, response) => {
  User.find({email: request.params.email},
    (err, userData) => {
      response.send(userData)
    });
});

app.get('/books', getAllUsers)

app.post('/addbooks', (req, res) => {
  // for post requests, data is inside of the body
  // as long as we have the app.use(express.json()) line at the top of the file
  console.log(req.body);
  // find the relevant user in the database
  // Users.find({email: req.body.email}, (err, userData) => {
  //   if(userData.length < 1) {
  //     res.status(400).send('user does not exist');
  //   } else {
  //     // add the new gift info to that user
  //     let user = userData[0];
  //     user.books.push({
  //       name: req.body.name,
  //       description: req.body.description,
  //       status: req.body.status
  //     });
  //     // save the user
  //     user.save().then( (userData) => {
  //       console.log(userData);
  //       res.send(userData.gifts);
  //     });
  //   }
  // });
});

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