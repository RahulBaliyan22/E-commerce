const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product");

const {validateReview,isLoggedIn,isBuyer} = require("../middleWare");


router.post("/product/:id/review", validateReview, isLoggedIn,isBuyer,async (req, res) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;

    // Validate input
    if ((rating == 0 && comment == '') || rating == 0) {
      req.flash('error',"Please provide a proper review");
    }else{

    // Find product and create new review
    let product = await Product.findById(id);
    let review = new Review({ rating, comment });
    product.reviews.push(review);

    // Save product and review
    await product.save();
    await review.save();

    // Set success flash message
    req.flash('success', 'New review added');}

    // Redirect to product page after adding review
    res.redirect(`/product/${id}`);
  } catch (e) {
    res.status(500).render('error', { err: e.message });
  }
});




router.delete('/product/:id/review/:rid', isLoggedIn,async (req, res) => {
  const { id, rid } = req.params;
  try {
    
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send('Product not found');
    }
    product.reviews = product.reviews.filter(reviewId => reviewId.toString() !== rid);
    await product.save();
    await Review.findByIdAndDelete(rid);
    req.flash('success','Review deleted');
    res.redirect(`/product/${id}`);

  } catch (e) {
    res.status(500).render('error',{err:e.message})
  }
});


module.exports = router;
