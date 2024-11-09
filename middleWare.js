const {productSchema,reviewSchema} = require('./ssv')
const Product = require('./models/Product');
const validateProduct = (req,res,next)=>{
  let { name, img, price,quantity, discription } = req.body;
  const {error,value} = productSchema.validate({ name, img, price, quantity ,discription })
  if(error){
    console.log("in validateProduct ")
    return res.render('error',{err:error.message});
  }
  next();
}


const validateReview = (req,res,next)=>{

  let { rating,comment} = req.body;
  const {error,value} = reviewSchema.validate({ rating,comment})
  if(error){
    
    return res.render('error',{err:error.message});
  }
  next();
}


//check is user logged in
const isLoggedIn = (req,res,next)=>{

  if(!req.isAuthenticated()){
   req.flash('error','Please Log in')
    return res.redirect('/login');
  }
  next();
}


const isSeller = (req,res,next)=>{
  let {id} = req.params;
  if(!req.user.role || req.user.role==='buyer'){
    req.flash('error','you are not Allowed to Do this !')
    return res.redirect(id ? `/product/${id}` : '/products');
  }
  next();
}

const isBuyer = (req,res,next)=>{
  let {id} = req.params;
  if(!req.user.role || req.user.role==='seller'){
    req.flash('error','you are not Allowed to Do this !')
    return res.redirect(id ? `/product/${id}` : '/products');
  }
  next();
}

const isOwner = async(req,res,next)=>{
  let {id} = req.params;
  let item = await Product.findById(id);

   if(!item.owner || !item.owner.equals(req.user._id)){
    req.flash('error','NOT the Owner');
    return  res.redirect(id ? `/product/${id}` : '/products');
   }
  next();
}
const isProductAvailable = async(req,res,next)=>{
  let{id} = req.params //product id
  let {added} = req.body;
  let product = await Product.findById(id)
  if(!product.quantity || product.quantity<added){
    req.flash('error','Product not available');
    return res.redirect(id ? `/product/${id}` : '/products');
  }
  next();
}
module.exports = {validateProduct,validateReview,isLoggedIn,isSeller,isBuyer,isOwner,isProductAvailable};