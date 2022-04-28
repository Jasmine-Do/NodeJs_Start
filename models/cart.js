var mongoose = require('mongoose');
var Schema = mongoose.Schema;

cartSchema = new Schema({
	unique_id: Number,
    id_user: String,
    id_product: String,
    name: String,
	price: Number,
    image: String,
    quantity: Number,
    discount: Number
}),
Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;