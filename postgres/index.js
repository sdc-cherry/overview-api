const { Pool, Client } = require('pg');
const config = require('../config.js');

const client = new Client({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
})

client.connect();


let query = 'SELECT * FROM cart LEFT JOIN sess ON cart.session_id=sess.session_id';

const test = () => {
  return client.query(query)
    .then(res => {
      client.end();
      return res;
    });
}

module.exports.test = test;