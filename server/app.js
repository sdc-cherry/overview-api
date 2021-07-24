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

  db.styles(req.params.product_id)
    .then(result => {
      // For Each style object
      let results = result.rows;
      for (var i = 0; i < results.length; i++) {
        // Make photos array of objects unique
        let uniquePhotos = _.uniqBy(results[i].photos, obj => obj["id"]);
        for (var j = 0; j < uniquePhotos.length; j++) {
          delete uniquePhotos[j]["id"];
          delete uniquePhotos[j]["styleid"];
        }
        results[i].photos = uniquePhotos;
        // Replace skus array with object containing unique skus data
        let uniqueSkus = _.uniqBy(results[i].skus, obj => obj["id"]);
        let skus = {};
        for (var j = 0; j < uniqueSkus.length; j++) {
          skus[uniqueSkus[j]["id"]] = _.omit(uniqueSkus[j], ["id", "styleid"]);
        }
        results[i].skus = skus;
      }
      return results;
    })
    .then(results => res.status(200).send(results))
    .catch(err => res.status(502).send(err));
})

// Related Products
app.get('/products/:product_id/related', (req, res) => {

  db.related(req.params.product_id)
  .then(result => res.status(200).send(_.map(result.rows, 'related_product_id')))
  .catch(err => res.status(404).send(err));

})

module.exports = app;