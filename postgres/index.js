const { Pool, Client } = require('pg');
const Promise = require('bluebird');
const config = require('../config.js');

const pool = new Pool({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
});

module.exports.list = (startId, endId) => pool.query(`SELECT * FROM products WHERE id BETWEEN ${startId} AND ${endId}`);

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

  // GIVES DUPLICATED ARRAYS, BUT WORKABLE - 4 s
  let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style, JSON_AGG(p) AS photos, JSON_AGG(u) AS skus
                FROM styles AS s
                  LEFT JOIN photos AS p
                    ON s.id=p.styleId
                  INNER JOIN skus AS u
                    ON s.id=u.styleId
                WHERE productId=${id}
                GROUP BY s.id`;

  return pool.query(query);
};

module.exports.related = id => pool.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`);
