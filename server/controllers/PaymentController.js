let dbConnection = require('./DatabaseController')
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const jwt = require('../config/jwtConfig')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const getThisDay = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}

const createOrder = async function(items,details,uid) {

    let  statementcreateOrder = "INSERT INTO orders (order_number, order_date, " +
    "products_list, total, address, size, id_supplier_product, " +
    "uid_consumer, id_vehicle) VALUES ? "
  
    let products = {}
    let count = 0

    for (const item in items){
      if(item != 'details') {
        products[item] = items[item]
        count +=  parseInt(items[item].quantity)
      }
    }

    let order_number = Date.now()
    let order_date = getThisDay()
    let products_list = JSON.stringify(products)
    let total = count
    let address = details.morada
    let size = count
    let id_supplier_product = 0
    let uid_consumer = uid
    let id_vehicle = null

    let values = []

    values.push([order_number, order_date,products_list, total, 
      address, size, id_supplier_product,uid_consumer,  id_vehicle]) 
      
    let result = await dbConnection(statementcreateOrder,values)
    let id_order = result.insertId

    for (const id in products){ 

      let ad = await dbConnection("SELECT * FROM ads WHERE id='"+id+"';")
      let supplier = await dbConnection("SELECT * FROM suppliers WHERE email='"+ad[0].email+"';")
      let product_category = ad[0].category_name 
      let product_subcategory = ad[0].subcategory_name  
      let product_subsubcategory = ad[0].subsubcategory_name  
      let order_status = "A CONFIRMAR" 
      let product_owner_uid = supplier[0].uid  
      let product_buyer_uid = uid  
      let product_location = supplier[0].country 
      let buyer_location = details.morada 
      let orderDistance_km = 0
      let sameLocation = supplier[0].town === details.localidade ? 'freguesia' :
                          supplier[0].city === details.cidade ? 'município' :
                          supplier[0].district === details.distrito ? 'distrito' :
                          supplier[0].country === 'Porugal' ? 'país' :
                          supplier[0].continent === 'Europa' ? 'continente' : "mundo"
      let price = parseInt(products[id].price) * parseInt(products[id].quantity)
      
      const statement = "INSERT INTO orderedProducts (order_id, ad_id, product_category, product_subcategory, " +
      "product_subsubcategory, order_status,product_owner_uid, " +
      "product_buyer_uid, product_location, buyer_location, orderDistance_km, sameLocation, price) VALUES ? "
      let values = []
      values.push([id_order, id, product_category, product_subcategory,product_subsubcategory, order_status, 
        product_owner_uid, product_buyer_uid, product_location, buyer_location, orderDistance_km,
        sameLocation, price]) 
      await dbConnection(statement,values)

    }
}


const payOrder = async function(req, res) { 
    const uid_encrypt = req.cookies.userSession;
    let value = jwt.decryptID(uid_encrypt);
    let statement = "SELECT email FROM consumers WHERE uid="+ `'`+value+`'`;
    let result = await dbConnection(statement)
    let emailUser = result[0].email

    content = []

    const items = req.query
    const details = req.query.details  

    let path = ""

    createOrder(items,details,value)

    for (const item in items){
      if(item != 'details') {
        path += "&item"+item+"="+item
        const data = {
          price_data: 
          {
            currency: 'EUR', 
            product_data: 
            {
              name: items[item].name, 
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfEScgieWk5dJs9z61Ddekt-j09bY54pO4K2TPzlIQGgNXJsvz5atfb9VpgWFtvMUuh0&usqp=CAU']
            }, 
            unit_amount: items[item].price * 100
          },
          quantity: items[item].quantity,
        }
        content.push(data)
      } 
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
      success_url: `${YOUR_DOMAIN}?success=true`+path,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`+path,
      locale: 'pt',
    }); 

    res.send(session.url)

}

module.exports = {payOrder}
