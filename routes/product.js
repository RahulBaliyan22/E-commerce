const express = require("express");
const router = express.Router(); //mini server
const Review = require("../models/Review");
const Product = require("../models/Product");
const {validateProduct,isLoggedIn,isSeller,isOwner} = require("../middleWare");
const {Allproducts,GetproductForm,Addproduct,Showproduct,Getupdate,Patchupdate,Deleteproduct  } = require("../controllers/products")
//read
router.get("/products", isLoggedIn,Allproducts);

//create  product
router.get("/product/new",isLoggedIn,GetproductForm );

router.post("/products", validateProduct,isLoggedIn ,isSeller,Addproduct);

//populate db with other collection 
router.get("/product/:idd", isLoggedIn ,Showproduct);

//update
router.get("/product/:id/edit",isLoggedIn,Getupdate);

router.patch("/product/:id",validateProduct,isLoggedIn,isSeller,isOwner ,Patchupdate); 

//delete ❌
router.delete("/product/:id", isLoggedIn,isSeller,isOwner,Deleteproduct );


module.exports = { router };