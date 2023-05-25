let dbConnection = require('./DatabaseController')
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const jwt = require('../config/jwtConfig')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const payOrder = async function(req, res) { 
    const uid_encrypt = req.cookies.userSession;
    value = jwt.decryptID(uid_encrypt);
    let statement = "SELECT email FROM consumers WHERE uid="+ `'`+value+`'`;
    let result = await dbConnection(statement)
    let emailUser = result[0].email

    content = []

    const items = req.query

    for (const item in items){ 
        
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
      customer_email: emailUser,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      locale: 'pt'
    }); 

    res.send(session.url);

}

module.exports = {payOrder}
