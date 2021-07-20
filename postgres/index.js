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

const list = (numResults) => {
  let query = `SELECT * FROM products LIMIT ${numResults}`;
  return pool.query(query);
}
module.exports.test = test;
module.exports.list = list;