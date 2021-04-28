'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/best-books', {useNewUrlParser: true, useUnifiedTopology: true});

const User = require('./models/User')

const newUser = new User({
    name: 'Alex',
    email: 'alex@gmail.com', 
    books: [
      {name: 'JS Expert'}, 
      {description: 'Zero to Hero'}, 
      {status: 'published'}
    ]
  });

app.get('/', (request, response) => {
    // when we get that request, send a response that says 'hello!'
    // response has some methods that are very helpful, such as a send method
    response.send('hello! from best-books backend');
  });

app.get('/users', (req, res) => {
// get all the users from the database
User.find((err, databaseResults) => {
    // send them in my response
    res.send(databaseResults);
});
});

// route to get just one user
app.get('/user', (req, res) => {
User.find({name: req.query.name}, (err, databaseResults) => {
    // send them in my response
    res.send(databaseResults);
});
});



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 