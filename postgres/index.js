const { Pool, Client } = require('pg');
const config = require('../config.js');

// const client = new Client({
//   user: config.DBUSER,
//   database: config.DBNAME,
//   password: config.DBTOKEN,
//   port: 5432,
// })
const pool = new Pool({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
})


// client.connect();

let testQuery = 'SELECT * FROM cart LEFT JOIN sess ON cart.session_id=sess.session_id';

const test = () => pool.query(testQuery);

const list = numResults => pool.query(`SELECT * FROM products LIMIT ${numResults}`);

const info = id => {
  return pool.query(`SELECT * FROM products WHERE id=${id}`)
    .then(result1 => {
      return pool.query(`SELECT feature, value FROM features WHERE product_id=${id}`)
              .then(result2 => {
                // console.log('first: ', result1.rows[0]);
                // console.log('second: ', result2.rows);
                let product = result1.rows[0];
                product.features = result2.rows;
                console.log('final obj: ', product);
                return product;
              })
    }) ;
}

const related = id => pool.query(`SELECT related_product_id FROM related WHERE current_product_id=${id}`);


module.exports.test = test;
module.exports.list = list;
module.exports.info = info;
module.exports.related = related;