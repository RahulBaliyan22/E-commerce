const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
const userShema = new mongoose.Schema({
  email:{
    type:String,
    trim:true,
    required:true
  },
  role:{
    type:String,
    required:true
  },
  cart:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
    
  ]

});
userShema.plugin(plm);
const User = mongoose.model('User',userShema);
module.exports = User;