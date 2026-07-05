var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = mongoose.Schema.Types.ObjectId;

var wishlist  = new Schema({
    title: {type:String,default:"Cool with list"},
    products: [{type:objectId,ref: 'product'}]
})
module.exports = mongoose.model('wishlist',wishlist);