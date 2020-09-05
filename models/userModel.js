const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  email: String,
  address: String,
  zip: String,
  phone: Number,
  quantity: Number,
  itemtype: String,
  date: Date,
  donorhistory: String,
  active: Boolean,
  reqemail: String
});

module.exports = mongoose.model("donor", productSchema);
