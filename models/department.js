var ModelBase = require('./modelbase').Model();

/*
	Department 模型继承自 ModelBase 已经涵盖各种基本操作
*/
var Department = ModelBase.create({
	
	//对应的数据库表
	db_table:'tasty_department'
});

exports.Department = function(req,res){
	return Department;
};
