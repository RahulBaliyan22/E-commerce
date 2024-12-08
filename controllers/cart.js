const User = require("../models/User")
const Product  =require("../models/Product")
const Gettocart = async(req,res)=>{
  let userId = req.user._id;
  
  const user = await User.findById(userId).populate('cart.product');
  const productinfo = user.cart.map((p)=>p.product.name).join(',');
  res.render('cart/cart',{user,productinfo})
}

const Addtocart = async (req, res) => {
  let { id } = req.params; // product id
  let { added } = req.body;
  let userid = req.user._id;

  // Find the product and user
  let product = await Product.findById(id);
  let user = await User.findById(userid);

  // Check if the product is already in the user's cart
  const productInCart = user.cart.find(item => item.product._id.equals(id));

  if (productInCart) {
    // If product exists, increment the quantity
    productInCart.added += parseInt(added);
  } else {
    // If product doesn't exist, add it as a new item
    user.cart.push({ product, added });
  }

  // Save the updated user document
  await user.save();

  req.flash("success", "Product added to cart");
  res.redirect(`/product/${id}`);
}



const Deletefromcart = async(req,res)=>{
  let{id} = req.params //product id
  let userid = req.user._id;
  let user =  await User.findById(userid )
  user.cart = user.cart.filter((item)=>{
    if((item.product._id.equals(id))){
      return false;
    }else{
      return true;
    }
  })
  await user.save()
  res.redirect('/user/cart')
}

module.exports = {Addtocart,Gettocart,Deletefromcart};