const User = require("../models/User")
const Product  =require("../models/Product")
const Gettocart = async(req,res)=>{
  let userId = req.user._id;
  const user = await User.findById(userId).populate('cart.product');
  res.render('cart/cart',{user,success:res.locals.success , error:res.locals.error ,key: process.env.PUBLISH_KEY})
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

const adjustQuantity = async (req, res) => {
  try {
    
    // Find the user and populate their cart
    const customer = await User.findById(req.user._id).populate('cart.product');
    console.log(customer)
    if (!customer) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!customer.cart || customer.cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    // Array to store update promises
    const updatePromises = [];

    for (let item of customer.cart) {
      const Tquantity = item.product.quantity; // Total quantity in stock
      const Cquantity = item.added;           // Quantity in the cart

      if (Tquantity >= Cquantity) {
        // Calculate new quantity
        const nQuantity = Tquantity - Cquantity;

        // Create a promise to update the product's quantity
        const updatePromise = Product.findByIdAndUpdate(
          item.product._id,
          { quantity: nQuantity },
          { new: true } // Return the updated document
        );
        updatePromises.push(updatePromise);
        
      } else {
        console.log(`Not enough stock for product: ${item.product.name}`);
      }
    }
    customer.cart = [];
    await customer.save();
    await Promise.all(updatePromises);

    console.log("Quantities adjusted successfully.");
    return res.status(200).json({ message: "Quantities adjusted successfully." });
  } catch (error) {
    console.error("Error adjusting quantities:", error);
    return res.status(500).json({ error: "An error occurred while adjusting quantities." });
  }
};


module.exports = {Addtocart,Gettocart,Deletefromcart,adjustQuantity};