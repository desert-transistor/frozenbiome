var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // CommentSchema = require('./');

var BlogpostSchema = new Schema({
  title: String,
  content: String,
  url: String,
  updated: { type: Date, default: Date.now },
  // created
  isPublished: Boolean
  // comments: [CommentSchema]
});

module.exports = {
  model: mongoose.model('Blogpost', BlogpostSchema),
  schema: BlogpostSchema
};