const mongoose = require('mongoose');

const url='' // 'mongodb://localhost/fetcher'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let productsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
});
