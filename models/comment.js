const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = new Schema({
  creator :{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  commentText:{
    type : String,
  }
},{ timestamps: { } })

let CommentModel = mongoose.model('Comment', commentSchema)
module.exports = CommentModel