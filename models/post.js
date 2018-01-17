const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require('./comment')


let postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref : 'User'
  }],
  comments: [
    Comment.schema
  ]
}, { timestamps: { } })

let PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel