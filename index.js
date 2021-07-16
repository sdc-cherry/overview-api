const express = require('express');
const { Pool, Client } = require('pg');
const config = require('./config.js');

const client = new Client({
  user: 'michaelduckworth',
  database: 'test',
  password: config.DBTOKEN,
  port: 5432,
})

client.connect();

const app = express();

app.get('/', (req, res) => {
  client.query('SELECT * FROM accounts', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
    client.end()
  })
})



app.listen(3000, function () {
  console.log('Server is running on port 3000');
});