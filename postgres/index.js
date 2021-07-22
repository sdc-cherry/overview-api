const { Pool, Client } = require('pg');
const Promise = require('bluebird');
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
  // Use ARRAY_AGG  - https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-array_agg-function/
  let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style, JSON_AGG(p) AS photos
                FROM styles AS s LEFT JOIN photos AS p ON s.id=p.styleId
                WHERE productId=${id}
                GROUP BY s.id`
  //Query styles table info
  return pool.query(query)
    // .then(styleObjs => {
    //   // result1 is an array of style objects
    //   // Map array of style objects to promise-style queries
    //   let allStyleCalls = styleObjs.map(style => {
    //     console.log(style);
    //     // For each style ID (style object)
    //       // rename id -> style_id
    //       style.style_id = style.id;
    //       // get photos for that style ID
    //       return pool.query()
    //         // Set resulting array as property on style object
    //       // get skus for that style ID JSON_OBJECT_AGG
    //         // Set resulting array as AN OBJECT property on style object
    //     return Promise.resolve(style);

    //   })
    //   Promise.all(allStyleCalls).then(allStyles => {
    //     // Define results object
    //     // Set all results as a property in results object
    //     // Define a property with the current (input) product ID
    //     // Return results object
    //     return allStyles;
    //   })
    // })
};

module.exports.related = id => pool.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`);
