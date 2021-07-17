const express = require('express');
const { Pool, Client } = require('pg');
const config = require('./config.js');

const app = express();

const client = new Client({
  user: 'michaelduckworth',
  database: 'sdc_test',
  password: config.DBTOKEN,
  port: 5432,
})

client.connect();


app.get('/', (req, res, next) => {
  client.query('SELECT * FROM cart', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('field: ', res.fields);
      console.log('rows: ', res.rows);
    }
    client.end()
  })
})



app.listen(3000, function () {
  console.log('Server is running on port 3000');
});