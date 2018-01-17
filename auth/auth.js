const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports={
    isLogin : function(req,res,next){
        jwt.verify(req.headers.authorization,process.env.SECRET_KEY,function(err,decoded){
            if (!err){
                 req.user = decoded
                 next()
            } else {
                res.status(500).json({message:err})
            }
        })
    }
}