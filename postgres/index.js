const { Pool, Client } = require('pg');
const config = require('../config.js');

const pool = new Pool({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
})

module.exports.list = numResults => pool.query(`SELECT * FROM products LIMIT ${numResults}`);

module.exports.info = id => {
  return pool.query(`SELECT * FROM products WHERE id=${id}`)
    .then(result1 => {
      return pool.query(`SELECT feature, value FROM features WHERE product_id=${id}`)
        .then(result2 => {
          let product = result1.rows[0];
          product.features = result2.rows;
          return product;
        })
    });
};

module.exports.styles = id => {
  //Query styles table info
  return pool.query(`SELECT * FROM styles WHERE productId=${id}`)
    .then(result1 => {
      // result1 is an array of style objects
      // For each style ID (style object)
        // rename id -> style_id
        // get photos for that style ID
          // Set resulting array as property on style object
        // get skus for that style ID
          // Set resulting array as AN OBJECT property on style object
      // Define results object
      // Set all results as a property in results object
      // Define a property with the current (input) product ID

    })
};

module.exports.related = id => pool.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`);
