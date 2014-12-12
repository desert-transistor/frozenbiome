var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Blogpost = require('../blogpost/blogpost.model');
    

var UserSchema = new Schema({
  username: String,
  password: String,
  // created
  blogposts: [Blogpost.schema]
});

module.exports = {
  model: mongoose.model('User', UserSchema),
  schema: UserSchema
};