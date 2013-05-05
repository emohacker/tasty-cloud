var model = require('../models/department');
var Department = model.Department();

exports.query = function(req,res){
	var department = new Department({req:req,res:res});
	department.query();
	delete department;
};

exports.save = function(req,res){
	var department = new Department({data:req.body,req:req,res:res});
	department.save();
	delete department;
}
exports.delete = function(req,res){
	var department = new Department({data:req.body,req:req,res:res});
	department.delete();
	delete department;
}
