const express = require('express');
const axios = require('axios');
const router = express.Router(); 

//Sign in user
router.get('/postal-code/:id', async function(req,res) {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get('https://json.geoapi.pt/cp/'+req.params.id);
        // Retrieve the data from the response
        const postalCodeData = response.data;
        // Return the postal code data as the response
        return res.send(postalCodeData);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'An error occurred while fetching postal code data' });
      }
}) 

module.exports = router