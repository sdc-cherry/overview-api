const express = require('express');
const bodyParser = require('body-parser');
const db = require('../postgres/index');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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

  // Check for invalid parameters
  let params = Object.keys(req.query).sort();
  if (params.length > 0 && (params[0] !== 'count' || params[1] !== 'page')) {
    res.sendStatus(400);
    res.end();
  }

  //  Grab parameters from req, revert to default
  let pages = req.query.page ? req.query.page : 1;
  let count = req.query.count ? req.query.count : 5;
  // Calculate number of results based on parameters (page * count)
  let numResults = pages * count; // Try req.params if req.query doesn't work
  // Call db function to get products, based on parameters
  // Send back array of objects with products properties
  db.list(numResults)
    .then(results => res.status(200).send(results.rows))
    .catch(err => res.status(502).send(err));

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