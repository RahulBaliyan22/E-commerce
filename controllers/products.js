
const Product = require("../models/Product");

const Allproducts = async (req, res) => {
  try {
    let products = await Product.find().populate('reviews');
    
    for (let product of products) {
      let totalRating = 0;
      if (product.reviews.length > 0) {
        product.reviews.forEach((item) => {
          totalRating += item.rating;
        });
        product.avgRating = Math.round((totalRating / product.reviews.length)*2)/2;
      } else {
        product.avgRating = 0; // Handle case with no reviews
      }
      
      await product.save();
    }
    
    res.render("products/index", {
      products,
      success: res.locals.success,
      error: res.locals.error
    });
  } catch (e) {
    res.status(500).render('error', { err: e.message });
  }
}

const GetproductForm = (req, res) => {
  try{
  res.render("products/new");
  }catch(e){
    res.status(500).render('error',{err:e.message})
  }
}

const Addproduct = async (req, res) => {
  try{ let { name, img, price, discription ,quantity} = req.body;
  await Product.create({ name, img, price, discription,quantity,owner:req.user._id });
  req.flash('success','Product created successfully');
  res.redirect("/products");
  }catch(e){
    res.status(500).render('error',{err:e.message})
  }
 
}


const Showproduct = async (req, res) => {
  try {
    let { idd } = req.params;
    let item = await Product.findById(idd).populate("reviews"); // Populate reviews
    // Render the product page with the flash message
    res.render("products/show", { item, success: res.locals.success , error:  res.locals.error });
  } catch (e) {
    res.status(500).render('error', { err: e.message });
  }
}

const Getupdate = async (req, res) => {
  try{let { id } = req.params;
  let item = await Product.findById(id);
  res.render("products/edit", { item });}
  catch(e){
    res.status(500).render('error',{err:e.message})
  }
}

const Patchupdate = async (req, res) => {
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
}

const Deleteproduct = async (req, res) => {
  try{
   let{id} = req.params;
   let item = await Product.findByIdAndDelete(id);
   req.flash('success','Product DELETED successfully');
   res.redirect('/products')
  }
  catch(e){
    res.status(500).render('error',{err:e.message})
  }
}
module.exports = {Allproducts,GetproductForm,Addproduct,Showproduct,Getupdate,Patchupdate, Deleteproduct }
