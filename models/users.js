/**
 * @author Ryan Fernandes
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    firstname: {
      type: "String",
    },
    lastname: {
      type: "String",
    },
    date: {
      type: "String",
    },
    account_type: {
      type: "String",
    },
    status: {
      type: "String",
    },
    quantity: {
      type: "String",
    },
    item: {
      type: "String",
    },
  },
  { collection: "userrequests" }
);

var user = mongoose.model("user", userschema);

module.exports = user;
