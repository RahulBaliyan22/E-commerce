const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const User = require('../models/User')
const {isLoggedIn} = require("../middleWare");

router.get('/user/cart',isLoggedIn,async(req,res)=>{
  let userid = req.user._id;
  let user =  await User.findById(userid).populate('cart')
  res.render('cart/cart',{user})
})

router.post('/user/:id/add',isLoggedIn,async(req,res)=>{
  let{id} = req.params //product id
  let userid = req.user._id;
  let product = await Product.findById(id)
  let user =  await User.findById(userid )
  user.cart.push(product)
  await user.save()
  res.redirect('/user/cart')

})



module.exports = router;