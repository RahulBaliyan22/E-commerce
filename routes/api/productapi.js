const express = require('express');
const router = express.Router();
let {isLoggedIn} = require("../../middleWare");
const User =  require('../../models/User');
const {productLike} =require("../../controllers/productApi")

router.post("/products/:id/like", isLoggedIn, productLike);


module.exports = router;