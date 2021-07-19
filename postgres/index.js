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

const test = () => client.query(query);

module.exports.test = test;