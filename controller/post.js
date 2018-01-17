const Model = require('../models/post')

class Post {
  static findAll(req, res) {
    Model.find({}).populate('creator').populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'all post', data: rows })
      }
    })
  }

  static findSelfPost(req, res) {
    Model.find({ creator: req.user._id }).populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'daftar ke alay-an anda', data: rows })
      }
    })
  }

  static findOtherProfile(req, res) {
    Model.find({ creator: req.params.id }).populate('creator').populate('coments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'daftare ke alay-an orang ini', data: rows })
      }
    })
  }

  static add(req, res) {
    console.log("--------------",req.body);
    console.log("++++++++++++",req.file);
    let obj = {
      photoUrl: req.file.cloudStoragePublicUrl,
      caption: req.body.caption,
      creator: req.user._id
    }
    console.log("================================",obj);
    Model.create(obj, (err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'data has created', data: rows })
      }
    })
  }

  static remove(req, res) {
    Model.findByIdAndRemove(req.params.id, (err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'data has removed', data: rows })
      }
    })
  }

  static update(req, res) {
    let obj = {
      photoUrl: req.file.cloudStoragePublicUrl,
      caption: req.body.caption,
      creator: req.user._id
    }
    Model.findByIdAndUpdate(req.params.id, obj, (err, rows) => {
      console.log("ini err :", err, "ini rows :", rows);

      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'data has updated', data: rows })
      }
    })
  }

  static detail(req, res) {
    Model.findById(req.params.id).populate('creator').populate('comments')
    .populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.status(200).json({ message: 'detail for this post', data: rows })
      }
    })
  }

  static addComment(req, res) {
    console.log(req.user._id);
    console.log(req.body.commentText);
    
    let comment = {
      creator: req.user._id,
      commentText: req.body.commentText
    }
    Model.findByIdAndUpdate({ _id: req.params.id }, {
      $push: {
        comments: comment
      }
    }, { new: true }).populate('creator').populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
       Model.find({}).populate('creator').populate('comments.creator').exec((err, data) => {
         if(err){
           res.status(500).json({message : err})
         }else{
          res.status(200).json({ message: `ngomen`, data: data })
         }
       })
      }
    })
  }


  static addCommentSingle(req, res) {
    console.log(req.user._id);
    console.log(req.body.commentText);
    
    let comment = {
      creator: req.user._id,
      commentText: req.body.commentText
    }
    Model.findByIdAndUpdate({ _id: req.params.id }, {
      $push: {
        comments: comment
      }
    }, { new: true }).populate('creator').populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
       Model.findById(req.params.id).populate('creator').populate('comments.creator').exec((err, data) => {
         if(err){
           res.status(500).json({message : err})
         }else{
          res.status(200).json({ message: `ngomen`, data: data })
         }
       })
      }
    })
  }

  static addCommentOnMyPage(req, res) {
    console.log(req.user._id);
    console.log(req.body.commentText);
    
    let comment = {
      creator: req.user._id,
      commentText: req.body.commentText
    }
    Model.findByIdAndUpdate({ _id: req.params.id }, {
      $push: {
        comments: comment
      }
    }, { new: true }).populate('creator').populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
       Model.find({creator : req.user._id}).populate('creator').populate('comments.creator').exec((err, data) => {
         if(err){
           res.status(500).json({message : err})
         }else{
          res.status(200).json({ message: `ngomen`, data: data })
         }
       })
      }
    })
  }

  static addCommentOnOtherpage(req, res) {
    console.log(req.user._id);
    console.log(req.body.commentText);
    
    let comment = {
      creator: req.user._id,
      commentText: req.body.commentText
    }
    Model.findByIdAndUpdate({ _id: req.params.id }, {
      $push: {
        comments: comment
      }
    }, { new: true }).populate('creator').populate('comments.creator').exec((err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
       Model.find({creator : req.params.id}).populate('creator').populate('comments.creator').exec((err, data) => {
         if(err){
           res.status(500).json({message : err})
         }else{
          res.status(200).json({ message: `ngomen`, data: data })
         }
       })
      }
    })
  }

  static addLike(req, res) {
    Model.findById(req.params.id, (err, rows) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        if (rows.likes.indexOf(req.user._id) == -1) {
          rows.likes.push(req.user._id)
          rows.save()
            .then(like => {
              res.status(200).json({ message: 'liked', data: like })
            }).catch(err => {
              res.status(500).json({ message: err })
            })
        } else {
          rows.likes.pull(req.user._id)
          rows.save()
            .then(unlike => {
              res.status(200).json({ message: 'unliked', data: unlike })
            }).catch(err => {
              res.status(500).json({ message: err })
            })
        }
      }
    })
  }

}
module.exports = Post