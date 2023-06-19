let dbConnection = require('./DatabaseController')
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const jwt = require('../config/jwtConfig')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getThisDay = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}

const createOrder = async function(items,details,uid) {

    let  statementcreateOrder = "INSERT INTO orders (order_number, order_date, " +
    "products_list, total, address, size, " +
    "uid_consumer) VALUES ? "
  
    let products = {}
    let count = 0
    let products_ids = []

    for (const item in items){
      if(item != 'details') {
        products[item] = items[item]
        products_ids.push(item)
        count +=  parseInt(items[item].quantity)
      }
    } 

    let order_number = Date.now()
    let order_date = getThisDay()
    let products_list = JSON.stringify(products_ids)
    let total = count
    let address = details.morada
    let size = count
    let uid_consumer = uid

    let values = []

    values.push([order_number, order_date,products_list, total, 
      address, size,uid_consumer]) 
      
    let result = await dbConnection(statementcreateOrder,values)
    let id_order = result.insertId 

    let getOrderedsProducts = []

    for (const id in products){ 

      let ad = await dbConnection("SELECT * FROM ads WHERE id='"+id+"';")
      let supplier = await dbConnection("SELECT * FROM suppliers WHERE id='"+ad[0].supplier_id+"';")
      let product_category = ad[0].category_name 
      let product_subcategory = ad[0].subcategory_name  
      let product_subsubcategory = ad[0].subsubcategory_name  
      let order_status = "A CONFIRMAR" 
      let product_owner_uid = supplier[0].uid
      let product_buyer_uid = uid  
      let product_location = supplier[0].country
      let buyer_location = details.morada 
      let sameLocation = supplier[0].town === details.localidade ? 'freguesia' :
                          supplier[0].city === details.cidade ? 'município' :
                          supplier[0].district === details.distrito ? 'distrito' :
                          supplier[0].country === 'Portugal' ? 'país' :
                          supplier[0].continent === 'Europa' ? 'continente' : "mundo"
      let price = parseInt(products[id].price) * parseInt(products[id].quantity)
      
      const statement = "INSERT INTO orderedProducts (order_id, ad_id, product_category, product_subcategory, " +
      "product_subsubcategory, order_status,product_owner_uid, " +
      "product_buyer_uid, product_location, buyer_location, sameLocation, price, quantity) VALUES ? "
      let values = []
      values.push([id_order, id, product_category, product_subcategory,product_subsubcategory, order_status, 
        product_owner_uid, product_buyer_uid, product_location, buyer_location, sameLocation, price, parseInt(products[id].quantity)]) 
      let response = await dbConnection(statement,values)
      getOrderedsProducts.push(response.insertId)
    }
    return [id_order, getOrderedsProducts]
}


const payOrder = async function(req, res) {  

  const DOMAIN = req.rawHeaders[3] + "://" + req.rawHeaders[1] + "/consumer"
  try {

    const uid_encrypt = req.cookies.userSession;
    let value = jwt.decryptID(uid_encrypt);
    let statement = "SELECT email FROM consumers WHERE uid="+ `'`+value+`'`;
    let result = await dbConnection(statement)
    let emailUser = result[0].email

    content = []

    const items = req.query
    const details = req.query.details  

    let ordersToGet = await createOrder(items,details,value)

    res.cookie("ordersToCheck", {ordersToGet}, {
    })

    for (const item in items){
      if(item != 'details') {
        const data = {
          price_data: 
          {
            currency: 'EUR', 
            product_data: 
            {
              name: items[item].name, 
              images: items[item].url != null ?  [items[item].url] : ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539']
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
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/canceled`,
      locale: 'pt',
    }); 

    res.send(session.url)

  }
  catch (error) {
    res.send(`${DOMAIN}/canceled`)
  }
  
    

}

module.exports = {payOrder}
