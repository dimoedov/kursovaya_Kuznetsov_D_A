let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CarFixSchema = new Schema({
  kind_of_work: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  engineer: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CarFix', CarFixSchema);
