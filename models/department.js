var ModelBase = require('./modelbase').Model();

/*
	Department ģ�ͼ̳��� ModelBase �Ѿ����Ǹ��ֻ�������
*/
var Department = ModelBase.create({
	
	//��Ӧ�����ݿ��
	db_table:'tasty_department'
});

exports.Department = function(req,res){
	return Department;
};
