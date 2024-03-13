const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price:{
    type:Number
    }
});

const Product = mongoose.model("Dog", ProductSchema);

module.exports = { Product };
