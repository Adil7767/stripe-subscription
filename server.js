const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
}));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body;
  try {
    // 1. Create product
    const product = await stripe.products.create({
      name: 'Runtime Product',
    });

    // 2. Create price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 500, // $5.00
      currency: 'usd',
      recurring: { interval: 'month' },
    });

    // 3. Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      client_reference_id: userId, // Pass your user ID here
      success_url: `${process.env.CLIENT_ORIGIN || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_ORIGIN || 'http://localhost:3000'}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to fetch session details after payment
app.get('/session-details', async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer'],
    });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/save-user-to-product', async (req, res) => {
  const { session_id } = req.body;
  try {
    // Retrieve the session and expand customer and line_items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'line_items.data.price.product'],
    });

    const customerEmail = session.customer.email;
    const productId = session.line_items.data[0].price.product.id;

    // Update product metadata with customer email
    await stripe.products.update(productId, {
      metadata: {
        last_buyer_email: customerEmail,
        last_buyer_session: session_id,
      },
    });

    res.json({ success: true, email: customerEmail, productId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.SERVER_PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 