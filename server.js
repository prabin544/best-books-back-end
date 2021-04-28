'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (request, response) => {
    // when we get that request, send a response that says 'hello!'
    // response has some methods that are very helpful, such as a send method
    response.send('hello!');
  });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 