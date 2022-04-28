var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
	unique_id: Number,
    name: String,
    type: String,
	price: Number,
    image: String,
    detail: String,
    discount: Number
}),
Product = mongoose.model('Product', productSchema);

module.exports = Product;