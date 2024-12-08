const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedOut} = require('../middleWare')

const {Home,About,Contact,Signup,Adduser,Login}= require("../controllers/auth")

router.get('/',Home)

router.get('/about',About)

router.get('/contacts',Contact)

router.get('/signup',isLoggedOut, Signup)

//actuall want to register
router.post('/signup',isLoggedOut,Adduser)

//log in 
router.get('/login',isLoggedOut, Login)


router.post('/login',isLoggedOut,passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}),(req,res)=>{
  req.flash('success','Welcome')
  res.redirect('/');
})

//log out
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.send('Error logging out');
    req.flash('success','LOGGED OUT')
    res.redirect('/login');
  });
});

module.exports = router;