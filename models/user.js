const mongoose = require('mongoose')
const Schema = mongoose.Schema

  let userSchema = new Schema({
    username : String,
    email : {
      type : String,
      required : true
    },
    password : String,
    followers : [{
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    following : [{
      type : Schema.Types.ObjectId,
      ref : 'User'
    }]
  },{Timestamp:{}})

  let UserModel = mongoose.model('User',userSchema)
  module.exports=UserModel