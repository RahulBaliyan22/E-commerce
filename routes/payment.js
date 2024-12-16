
const {isLoggedIn, isBuyer}= require('../middleWare.js');
const stripe = require('stripe')(process.env.SECRET_KEY); // Replace with your secret key
const express = require('express');
const router = express.Router();

router.post('/payment_gateway', isLoggedIn, isBuyer,async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

