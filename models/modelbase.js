var _ = require('underscore');
var $util = require('../libs/util').getUtil();
var db = require('../libs/db');
var DBHelper = db.DBHelper;
var dbPool = db.MySQL.getMySQLPool();
var initializing = false;

/*
	基础Model，其他所以的Model从此基础上继承
	包含MySQL单个数据表的基本CRUD操作
	其他模型继承此基础模型后可根据业务逻辑的需要重写其基本操作
*/
function Model(baseClass, prop) {
	if(typeof(baseClass) === "object") {
		prop = baseClass;
		baseClass = null;
	}
	function F() {
		if(!initializing) {
			if(baseClass) {
				this.base = baseClass.prototype;
			}
			this.init.apply(this, arguments);
		}
	}
	if(baseClass) {
		initializing = true;
		F.prototype = new baseClass();
		F.prototype.constructor = F;
		initializing = false;
	}
	for(var name in prop) {
		if(prop.hasOwnProperty(name)) {
			F.prototype[name] = prop[name];
		}
	}
	return F;
};

var ModelBase = Model({
	db_table:'',
	data:null,
	req:null,
	res:null,
	/*
		options{
			data:,//数据
			req:,//express req
			res:,//express res
		}
	*/
	init:function(options){
		for(key in options){
			if(options.hasOwnProperty(key)){
				this[key] = options[key] || null;
			}
		}
	},
	query:function(){
		var sql=''
			, orderby = this.req.params && this.req.params.orderby
		 	, page  =  this.req.params && this.req.params.page
		 	, limit = this.req.params && this.req.params.limit;
		this.targetId = this.req.params && this.req.params.id;//路径中含有id时查询单个记录
		if(this.targetId!==undefined){
			if(this.targetId == 0){//查询列表总量，用于分页
				sql = 'SELECT count(id) listcount FROM '+this.db_table;
			}else{
				sql = 'SELECT * FROM '+this.db_table+ ' WHERE id='+this.targetId;
			}
		}else{
			sql = 'SELECT * FROM '+this.db_table;
			if(orderby!==undefined){
				var orderby = $util.explode('-',orderby,false);
				sql += ' ORDER BY '+ orderby[0]+' '+orderby[1];
			}
			if( page!==undefined && limit!==undefined){
				sql +=  ' LIMIT '+((page-1)*limit)+','+limit;
			}
		}
		this.executeSql(sql);
	},
	save:function(){
		if(this.data!==undefined){
			var sql = DBHelper.objectToSqlStr(this.data,this.db_table);
			this.executeSql(sql);
		}else{
			this.raiseError(404);
			console.log('no data');
		}
	},
	delete:function(){
		this.targetId = this.req.params && this.req.params.id;//路径中含有id时查询单个记录
		if(this.targetId !==undefined){
			var sql =  DBHelper.objectToSqlStr({id:this.targetId},this.db_table,'delete');
			this.executeSql(sql);
		}else{
			this.raiseError(404);
			console.log('no data');
		}
	},
	executeSql:function(sql){
		console.log(sql);
		var self = this;
		dbPool.getConnection(function(err,connection){
			if(!err){
				connection.query(sql,function(err,result){
					if(!err){
						if(_.isArray(result)){
							if(self.targetId !== undefined){//query by id 或查询列表总量用于分页
								if(result.length>=1){
									self.res.json(result[0]); 
								}else{
									self.raiseError('none');
								}
							}else{//query list
								self.res.send(result);
							}
						}else{
							self.res.send(result);//save delete
						}
					}else{
						self.raiseError(404);
						connection.end();
						throw err;
					}
					connection.end();
				});
			}else{
				throw err;
			}
		});
	},
	raiseError:function(stateCode,errInfo){
		if(errInfo!==undefined){
			this.res.send(errInfo);
		}else{
			this.res.status(stateCode);
		}
	}
});

exports.Model = function(res,req){
	return {
		create:function(obj){
			return Model(ModelBase,obj);
		}
	}
}