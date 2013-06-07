var _ = require('underscore');
var $util = require('../libs/util').getUtil();
var ModelBase = require('./modelbase').Model();
/*
	ProductCate模型继承ModelBase之后重写了query方法
*/
var ProductCate = ModelBase.create({
	db_table:'tasty_products_cate'
	, query:function(){
		var sql=''
			, orderby = this.req.params && this.req.params.orderby
		 	, page  =  this.req.params && this.req.params.page
		 	, limit = this.req.params && this.req.params.limit;\
		 	
		//路径中含有id时查询单个记录
		this.targetId = this.req.params && this.req.params.id;
		if(this.targetId!==undefined){
			if(this.targetId == 0){ 
				sql = 'SELECT count(id) listcount FROM '+this.db_table;
			}else{
				sql = 'SELECT * FROM '+this.db_table+ ' WHERE id='+this.targetId;
			}
		}else{
			sql = 'SELECT d.id departid,d.title departname,pc.id id,pc.title title FROM '+this.db_table +' pc '+
				' INNER JOIN tasty_department d ON pc.departid = d.id'+
				' WHERE pc.deleted = 0 ';
			if(orderby!==undefined){
				var orderby = $util.explode('-',orderby,false);
				sql += ' ORDER BY '+ orderby[0]+' '+orderby[1];
			}
			if( page!==undefined && limit!==undefined){
				sql +=  ' LIMIT '+((page-1)*limit)+','+limit;
			}
		}
		this.executeSql(sql);
	}
});

exports.ProductCate = function(req,res){
	return ProductCate;
};