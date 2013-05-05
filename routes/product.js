var model = require('../models/product');
var Product = model.Product();

exports.query = function(req,res){
	var product = new Product({req:req,res:res});
	product.query();
	delete product;
};

exports.save = function(req,res){
	var product = new Product({data:req.body,req:req,res:res});
	product.save();
	delete product;
}
exports.delete = function(req,res){
	var product = new Product({req:req,res:res});
	product.delete();
	delete product;
}
