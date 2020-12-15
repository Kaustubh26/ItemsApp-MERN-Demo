const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema =  new Schema({
  name: {
  	type: String,
  	required: true
  },
  description: {
  	type: String,
  	required: true
  },
  status: {
    type:  String,
    enum: ['instock', 'ordered', 'accepted', 'dispatched', 'rejected'],
    default: 'instock'
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);