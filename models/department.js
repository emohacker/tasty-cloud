var ModelBase = require('./modelbase').Model();

/*
	Department ģ�ͼ̳��� ModelBase �Ѿ����Ǹ��ֻ�������
*/
var Department = ModelBase.create({
	db_table:'tasty_department'//��Ӧ�����ݿ��
});

exports.Department = function(req,res){
	return Department;
};
