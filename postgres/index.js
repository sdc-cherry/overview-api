const { Pool, Client } = require('pg');
const Promise = require('bluebird');
const config = require('../config.js');

const pool = new Pool({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
});

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

  // JSON_OBJECT_AGG(quantity, size) -> quantity value is key and size - probably want when each sku obj built and need skus

  // For each sku (id),
    // want to construct an object with quantity and size properties

  // Want object with all of the sku id: sku object properties

  // let query = `SELECT JSON_OBJECT_AGG(quantity, size) AS test
  //               FROM skus
  //               WHERE styleID=1
  //               GROUP BY styleID`
  // let query = `SELECT id, JSON_OBJECT_AGG(quantity, size) AS test
  //               FROM skus
  //               WHERE styleID=1
  //               GROUP BY id`

  //sku data for single style id
  // let query = `SELECT *
  //               FROM skus
  //               WHERE styleID=1
  //               GROUP BY id`

  // PHOTOS AS ARRAY OF OBJECT, BUT WITH EXTRA FIELDS
  // let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style, JSON_AGG(p) AS photos
  //               FROM styles AS s
  //                 LEFT JOIN photos AS p
  //                   ON s.id=p.styleId
  //               WHERE productId=${id}
  //               GROUP BY s.id`;

  // GIVES DUPLICATED ARRAYS, BUT WORKABLE - 4 s
  let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style, JSON_AGG(p) AS photos, JSON_AGG(u) AS skus
                FROM styles AS s
                  LEFT JOIN photos AS p
                    ON s.id=p.styleId
                  INNER JOIN skus AS u
                    ON s.id=u.styleId
                WHERE productId=${id}
                GROUP BY s.id`;

  // Try replacing LEFT JOIN photos with LJ (qry statement to get styleid and array of objs)
  // let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style, p.url, p.thumbnail_url, u.id AS sku_id, u.quantity, u.size
  //               FROM styles AS s
  //                 LEFT JOIN photos AS p
  //                   ON s.id=p.styleId
  //                 INNER JOIN skus AS u
  //                   ON s.id=u.styleId
  //               WHERE productId=${id}`;

  // JUST STYLES
  // let query = `SELECT s.id AS style_id, s.name, s.sale_price, s.original_price, s.default_style
  //               FROM styles AS s
  //               WHERE productId=${id}`;
  return pool.query(query);
};

module.exports.related = id => pool.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`);
