const { default: mongoose } = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  img:{
    type:String,
    trim:true
  },
  price:{
    type:Number,
    min:0,
    required:true
  },
  discription:{
    type:String,
    trim:true
  },
  avgRating:{
    type:Number
  },
  quantity:{
    type : Number,
    required:true
  },
  reviews:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  owner:{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
})


productSchema.post('findOneAndDelete',async(product)=>{
  if(product.reviews.length>0){
    await Review.deleteMany({_id:{$in:product.reviews}})
  }})

let Product = mongoose.model('Product',productSchema);

module.exports = Product;