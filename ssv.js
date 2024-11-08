//server side rendering


const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().min(0).required(),
    discription: Joi.string().allow('')
})


const reviewSchema = Joi.object({
  rating: Joi.string().min(1).max(5).required(),
  comment: Joi.string().allow('')
})



module.exports = {productSchema,reviewSchema}