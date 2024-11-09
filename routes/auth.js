const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')

router.get('/signup' , (req,res)=>{
  res.render('auth/signUp',{success:res.locals.success,error:res.locals.error})
})

//actuall want to register
router.post('/signup',async(req,res)=>{
let{username,email,password,confirmpassword,role} = req.body;

if(password!=confirmpassword){
  req.flash('error','Write correct password');
  return res.redirect('/signup');
}else{
  try{
    const user = new User({ username, email ,role});
    await User.register(user, password);
    req.flash('success','user Signed in Successful')

    // res.redirect('/login')

    req.login(user,(err)=>{
      if(err){return next(err)}
      req.flash('success','user signed up successful')
      return res.redirect('/products')
    })
  }catch(e){    
    req.flash('error',e.message)
    res.redirect('/signup')
  }
}
})

//log in 
router.get('/login' , (req,res)=>{
  res.render('auth/login',{success:res.locals.success,error:res.locals.error})
})


router.post('/login',passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}),(req,res)=>{
  res.redirect('/products');
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