const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const payOrder = async function(req, res) {

    content = []


    const items = req.query

    for (item in items){ 
        
        const data = {
                      price_data: 
                        {
                            currency: 'EUR', 
                            product_data: 
                            {
                                name: items[item].name, 
                                images: ['https://www.ronis.hr/slike/velike/mobitel-apple-iphone-14-6gb128gb-plavi-mpvn3sxa_273721.jpg']
                            }, 
                            unit_amount: items[item].price * 100
                        },
                      quantity: items[item].quantity,
                    }
        content.push(data)
    }

    const session = await stripe.checkout.sessions.create({
        shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 200, currency: 'EUR'},
                display_name: '->',
                delivery_estimate: {
                  minimum: {unit: 'business_day', value: 5},
                  maximum: {unit: 'business_day', value: 7},
                },
              },
            },
          ],
        line_items: content,
        customer_email: 'xeyor87126@saeoil.com',
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        locale: 'pt'
    });

    res.send(session.url);

}

module.exports = {payOrder}
