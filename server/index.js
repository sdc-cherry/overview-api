const express = require('express');
const db = require('../postgres/index');
const app = express();



app.get('/', (req, res, next) => {
  db.test((err,res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('field: ', res.fields);
      console.log('rows: ', res.rows);
    }
  });
})



app.listen(3000, function () {
  console.log('Server is running on port 3000');
});