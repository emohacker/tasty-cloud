var model = require('../models/productcate');
var ProductCate = model.ProductCate();

exports.query = function(req,res){
	var productCate = new ProductCate({req:req,res:res});
	productCate.query();
	delete productCate;
};

exports.save = function(req,res){
	var productCate = new ProductCate({data:req.body,req:req,res:res});
	productCate.save();
	delete productCate;
}
exports.delete = function(req,res){
	var productCate = new ProductCate({req:req,res:res});
	productCate.delete();
	delete productCate;
}
