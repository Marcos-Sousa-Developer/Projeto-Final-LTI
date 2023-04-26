const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const payOrder = async function(req, res) {

    const product = await stripe.products.create({
        name: 'My Product',
    });
    
    const price = await stripe.prices.create({
        unit_amount: 3000, // Amount in cents
        currency: 'usd',
        product: product.id,
    });

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price.id, // Use the ID of the created Price object
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.send(session.url);

}

module.exports = {payOrder}
