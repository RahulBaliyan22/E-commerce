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

  let product = await Product.findById(id).populate('owner');
  let user = await User.findById(userid);
  let owner = await User.findById(product.owner);

  let amount = owner.amount +  added*product.price;
  const productInCart = user.cart.find(item => item.product._id.equals(id));

  if (productInCart) {
    productInCart.added += parseInt(added);
    await User.updateOne(owner,{$set:{amount}})
  } else {
    user.cart.push({ product,added});
  }

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