const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const db = require('../postgres/index');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// List Products
app.get('/products', (req, res) => {

  // Check for invalid parameters
  let params = Object.keys(req.query).sort();
  if (params.length > 0 && (params[0] !== 'count' || params[1] !== 'page')) {
    res.sendStatus(400).end();
  } else {

    //  Grab parameters from req, revert to default. Try req.params if req.query doesn't work
    let pages = req.query.page ? req.query.page : 1;
    let count = req.query.count ? req.query.count : 5;
    // Calculate number of results based on parameters (page * count)
    let numResults = pages * count;
    // Call db function to get products, based on parameters
    // Send back array of objects with products properties
    db.list(numResults)
      .then(results => res.status(200).send(results.rows))
      .catch(err => res.status(502).send(err));
  }

})

// Product Information
app.get('/products/:product_id', (req, res) => {
  // Error response for non-integer value
  db.info(req.params.product_id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(502).send(err));
  })

  // Product Styles
app.get('/products/:product_id/styles', (req, res) => {
    /**
     * Parameters:
     *    product_id (integer) - Required ID of the Product requested
     *
     * Response status: 200 OK
     */
  db.styles(req.params.product_id)
    .then(result => res.status(200).send(result.rows))
    .catch(err => res.status(502).send(err));
})

// Related Products
app.get('/products/:product_id/related', (req, res) => {

  db.related(req.params.product_id)
  .then(result => res.status(200).send(_.map(result.rows, 'related_product_id')))
  .catch(err => res.status(502).send(err));

})

module.exports = app;