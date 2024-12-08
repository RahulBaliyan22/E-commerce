//server side rendering


const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().min(0).required(),
    quantity:Joi.number().min(1).required(),
    discription: Joi.string().allow('')
})

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('')
})



module.exports = {productSchema,reviewSchema}