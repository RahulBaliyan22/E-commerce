const User = require("../models/User")
const Product  =require("../models/Product")
const Gettocart = async(req,res)=>{
  let userId = req.user._id;
  const user = await User.findById(userId).populate('cart.product');
  res.render('cart/cart',{user,success: res.locals.success , error:  res.locals.error })
}

const Addtocart = async (req, res) => {
  let { id } = req.params; // product id
  let { added } = req.body;
  let userid = req.user._id;
  try{
  let product = await Product.findById(id).populate('owner');
  let user = await User.findById(userid);
  let owner = await User.findById(product.owner);

  let amount = owner.amount +  added*product.price;
  const productInCart = user.cart.find(item => item.product._id.equals(id));

  if (productInCart) {
    productInCart.added += parseInt(added);
  } else {
    user.cart.push({ product,added});
  }
  await User.updateOne(owner,{$set:{amount}})
  await user.save();

  req.flash("success", "Product added to cart");
  res.redirect(`/product/${id}`);
}catch(e){
  res.render('error',{err:e});
}
}



const Deletefromcart = async (req, res) => {
  let { id } = req.params; 
  let userId = req.user._id;

  try {
    let user = await User.findById(userId);
    for (let i = 0; i < user.cart.length; i++) {
      let item = user.cart[i];
      if (item.product._id.equals(id)) {
        const product = await Product.findById(item.product._id).populate('owner');
        let {added} = item;
        const owner =await User.findById(product.owner)
        let amount  = owner.amount - product.price*added;
        await User.updateOne(owner,{$set:{amount}})
        user.cart.splice(i, 1);
        break;
      }
    }

    await user.save();
    req.flash('success',"Product Removed")
    res.redirect('/user/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while deleting the product from the cart.');
  }
};

module.exports = {Addtocart,Gettocart,Deletefromcart};