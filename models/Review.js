const mongoose = require('mongoose');
const reviewShema = new mongoose.Schema({
  rating:{
    type:Number,
    min:0,
    max:5,
    required:true
  },
  comment:{
    type:String,
    trim:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{timestamps:true});

const Review = mongoose.model('Review',reviewShema);
module.exports = Review;