var express = require('express');
var router = express.Router();
const User = require('../controller/user')
const auth = require('../auth/auth')

router.post('/signup',User.signup)
router.post('/signin',User.signin)
router.get('/:id',User.findUser)
router.put('/followings/:id',auth.isLogin,User.addFollowing)
router.put('/:id',auth.isLogin,User.update)
module.exports = router;
