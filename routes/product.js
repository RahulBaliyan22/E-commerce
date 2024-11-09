const express = require("express");
const router = express.Router(); //mini server
const Review = require("../models/Review");
const Product = require("../models/Product");
const {validateProduct,isLoggedIn,isSeller,isOwner,isProductAvailable} = require("../middleWare");

//read
router.get("/products", isLoggedIn , async (req, res) => {
  try{
  let products = await Product.find();
  res.render("products/index", { products , success: res.locals.success,error:res.locals.error});
  }catch(e){
    res.status(500).render('error',{err:e.message})
  }
});

//create  product
router.get("/product/new",isLoggedIn, (req, res) => {
  try{
  res.render("products/new");
  }catch(e){
    res.status(500).render('error',{err:e.message})
  }
});

router.post("/products", validateProduct,isLoggedIn ,isSeller,async (req, res) => {
  try{ let { name, img, price, discription ,quantity} = req.body;
  await Product.create({ name, img, price, discription,quantity,owner:req.user._id });
  req.flash('success','Product created successfully');
  res.redirect("/products");
  }catch(e){
    res.status(500).render('error',{err:e.message})
  }
 
});

//populate db with other collection 
router.get("/product/:idd", isLoggedIn ,async (req, res) => {
  try {
    let { idd } = req.params;
    let item = await Product.findById(idd).populate("reviews"); // Populate reviews
    // Render the product page with the flash message
    res.render("products/show", { item, success: res.locals.success , error:  res.locals.error });
  } catch (e) {
    res.status(500).render('error', { err: e.message });
  }
});

//update
router.get("/product/:id/edit",isLoggedIn,async (req, res) => {
  try{let { id } = req.params;
  let item = await Product.findById(id);
  res.render("products/edit", { item });}
  catch(e){
    res.status(500).render('error',{err:e.message})
  }
});

router.patch("/product/:id",validateProduct,isLoggedIn,isSeller,isOwner ,async (req, res) => {
  try{let { id } = req.params;
  let { name, img, price, discription,quantity } = req.body;
  await Product.findByIdAndUpdate(
    { _id: id },
    { $set: { name, img, price, discription,quantity } }
  );
  req.flash('success','Product updated successfully');
  res.redirect(`/product/${id}`);}
  catch(e){
    res.status(500).render('error',{err:e.message})
  } 
}); 

//delete ❌
router.delete("/product/:id", isLoggedIn,isSeller,isOwner,async (req, res) => {
  try{
   let{id} = req.params;
   let item = await Product.findByIdAndDelete(id);
   req.flash('success','Product DELETED successfully');
   res.redirect('/products')
  }
  catch(e){
    res.status(500).render('error',{err:e.message})
  }
});


module.exports = { router };