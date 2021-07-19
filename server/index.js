const express = require('express');
const db = require('../postgres/index');
const app = express();



app.get('/', (req, res, next) => {
  db.test()
    .then(res => {
      console.log('rows: ', res.rows);
    })
    .catch(err => {
      console.log(err);
    })
})



app.listen(3000, function () {
  console.log('Server is running on port 3000');
});