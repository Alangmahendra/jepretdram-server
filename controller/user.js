const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const Model = require('../models/user')

class User {
  static signup(req, res) {
    Model.findOne({ email: req.body.email }, function (err, rows) {
      if (rows) {
        res.json({ message: `email ini sudah terpakai` })
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            let obj = {
              email: req.body.email,
              password: hash
            }
            Model.create(obj, (err, rows) => {
              if (err) {
                res.status(500).json({ message: err })
              } else {
                res.status(200).json({ message: 'terdaftar', data: rows })
              }
            })
          })
        })
      }
    })
  }

  static signin(req, res) {
    Model.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        bcrypt.compare(req.body.password, user.password, function (err, data) {
          if (!err) {
            let payload = {
              _id: user._id,
              email: user.email
            }
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
              if (err) {
                res.status(500).json({ message: err })
              } else {
                res.status(200).json({ message: 'masuk', token: token,userid : user._id })
              }
            })
          }
        })
      }
    })
  }

  static findUser(req,res){
    Model.findById(req.params.id,(err,rows)=>{
      if(err){
        res.status(500).json({message : err})
      } else {
        res.status(200).json({message : 'data dari user ini',data : rows})
      }
    })
  }

  static findAll(req,res){
    Model.find({},(err,rows)=>{
      if(err){
        res.status(500).json({message : err})
      } else {
        res.status(200).json({message : 'this is all user of this app',data :rows})
      }
    })
  }

  static update(req,res){
    let obj = {
      username : req.body.username
    }
    Model.findByIdAndUpdate(req.params.id,obj,(err,rows)=>{
      if(err){
        res.status(500).json({message : err})
      } else {
        res.status(200).json({message : 'username updated',data : rows})
      }
    })
  }

  static addFollowing(req, res) {
    Model.findById(req.params.id, (err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        if (rows.following.indexOf(req.params.id) == -1) {
          rows.following.push(req.params.id)
          rows.save().then(follow => {
            res.status(200).json({ message: 'you have follow yhis user', data: follow })
          }).catch(err => {
            res.status(500).json({ message: err })
          })
        } else {
          rows.following.pull(req.params.id)
          rows.save().then(unfollow => {
            res.status(200).json({ message: `you unfollow this user` })
          }).catch(err => {
            res.status(500).json({ message: err })
          })
        }
      }
    })
  }

}

module.exports = User