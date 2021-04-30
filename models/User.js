const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name: String,
    description: String,
    status: String,
});

const UserSchema = new Schema({
  name: String,
  email: String,
  // favoriteActivities data type is an array of activitySchema
  books: [BookSchema]
});

// make a model out of the schema
const User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;