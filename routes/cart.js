const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const User = require('../models/User')
const {isLoggedIn,isProductAvailable} = require("../middleWare");
const {Addtocart,Gettocart,Deletefromcart} = require("../controllers/cart.js");


router.get('/user/cart',isLoggedIn,Gettocart)

router.post('/user/:id/add', isLoggedIn, isProductAvailable,Addtocart );

router.delete('/user/:id',Deletefromcart)


module.exports = router;