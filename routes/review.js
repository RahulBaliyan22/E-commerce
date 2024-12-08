const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product");

const {validateReview,isLoggedIn,isBuyer} = require("../middleWare");
const {Addreivew,Deletereview} = require("../controllers/review");

router.post("/product/:id/review", validateReview, isLoggedIn,isBuyer,Addreivew);

router.delete('/product/:id/review/:rid', isLoggedIn,Deletereview);


module.exports = router;
