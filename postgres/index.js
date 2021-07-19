const { Pool, Client } = require('pg');
const config = require('../config.js');

const client = new Client({
  user: config.DBUSER,
  database: config.DBNAME,
  password: config.DBTOKEN,
  port: 5432,
})

client.connect();


const test = (cb) => {
  let query = 'SELECT * FROM cart LEFT JOIN sess ON cart.session_id=sess.session_id';
  client.query(query, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
    //client.end()
  })

}

module.exports.test = test;