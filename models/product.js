var ModelBase = require('./modelbase').Model();
var $util = require('../libs/util').getUtil();
/*
	Product模型继承ModelBase之后重写了query方法
*/
var Product = ModelBase.create({
	db_table:'tasty_products'
	, query:function(){
		var sql=''
			, orderby = this.req.params && this.req.params.orderby
		 	, page  =  this.req.params && this.req.params.page
		 	, limit = this.req.params && this.req.params.limit;

		//路径中含有id时查询单个记录
		this.targetId = this.req.params && this.req.params.id;
		if(this.targetId!==undefined){
			if(this.targetId == 0){ 
				sql = 'SELECT count(id) listcount FROM '+this.db_table;
			}else{
				sql = 'SELECT * FROM '+this.db_table+ ' WHERE id='+this.targetId;
			}
		}else{
			sql = 'SELECT c.id cateid,c.title catename,p.* FROM '+this.db_table +' p '+
				' INNER JOIN tasty_products_cate c ON p.catid = c.id'+
				' WHERE p.deleted = 0 ';
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

exports.Product = function(req,res){
	return Product;
};
