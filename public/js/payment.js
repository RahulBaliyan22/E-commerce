const payButton = document.getElementById('pay-button');
const paymentForm = document.getElementById('payment-form');
const cardErrors = document.getElementById('card-errors');
const stripe = Stripe("pk_test_51QWCrHINlMsZ9k9dKdyGxNYYvg3UTIqdUk0l16IkG1KobwzGAuFfSbcVwiN8mffgy7lkcuaQIBOjapYAovIsIO3a00pDy59N6u"); 
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

payButton.addEventListener('click', async () => {
  try {
    // Get necessary attributes
    const user = payButton.getAttribute('user');
    const name = payButton.getAttribute('name');
    const subtotal = parseFloat(payButton.getAttribute('subtotal')) || 0;

    if (isNaN(subtotal) || subtotal <= 0) {
      cardErrors.textContent = 'Invalid subtotal. Please check the payment amount.';
      return;
    }

    // Step 1: Create PaymentIntent on the server
    const response = await fetch('/payment_gateway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(subtotal * 100) }) // Amount in paisa
    });

    if (!response.ok) {
      console.error('Server error:', await response.text());
      cardErrors.textContent = 'Failed to communicate with the payment gateway.';
      return;
    }

    const { clientSecret } = await response.json();

    // Step 2: Confirm Card Payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name }
      }
    });

    if (error) {
      console.error('Payment failed:', error);
      cardErrors.textContent = `Payment failed: ${error.message || 'Unknown error'}`;
    } else if (paymentIntent.status === 'succeeded') {
      const resp = axios
      .post('/cart/update', { user })
      .then(() => {
        console.log('Cart updated successfully');
        alert('Payment successful!');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Failed to update cart:', error.response?.data || error.message);
        alert('Payment successful, but cart update failed.');
      });
    
      
    }
  } catch (err) {
    console.error('Error during payment process:', err);
    cardErrors.textContent = 'Something went wrong. Please try again.';
  }
});
