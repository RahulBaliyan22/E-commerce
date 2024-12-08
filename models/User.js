const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: { // This references the Product model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      added: {
        type: Number,
        required: true,
        min: 1,
        default: 1, // Default quantity
      },
    },
  ],
  wishList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }]
});


userSchema.plugin(plm);

const User = mongoose.model('User',userSchema);
module.exports = User;