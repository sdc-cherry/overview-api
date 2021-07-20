const express = require('express');
const db = require('../postgres/index');
const app = express();


// Test query
// app.get('/', (req, res, next) => {
//   db.test()
//     .then(res => {
//       console.log('rows: ', res.rows);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })

// List Products
app.get('/products', (req, res) => {
  /**
   * Parameters:
   *    page (integer) - Selects the page of results to return. Default 1.
   *    count (integer) - Specifies how many results per page to return. Default 5.
   *
   * Response status: 200 OK
   */
  res.send('products');
})

// Product Information
app.get('/products/:product_id', (req, res) => {
  /**
   * Parameters:
   *    product_id (integer) - Required ID of the Product requested
   *
   * Response status: 200 OK
   */
  res.send('information');
})

// Product Styles
app.get('/products/:product_id/styles', (req, res) => {
  /**
   * Parameters:
   *    product_id (integer) - Required ID of the Product requested
   *
   * Response status: 200 OK
   */
  res.send('styles');
})

// Related Products
app.get('/products/:product_id/related', (req, res) => {
  /**
   * Parameters:
   *    product_id (integer) - Required ID of the Product requested
   *
   * Response status: 200 OK
   */
  res.send('related');
})


app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

module.exports = app;