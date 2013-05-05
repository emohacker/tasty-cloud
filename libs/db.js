//appfog.com的生产环境中，自动将链接配置转移，否则使用本地连接
var appfogProduction = function(){
	if(process.env.VCAP_SERVICES != undefined){
		var env = JSON.parse(process.env.VCAP_SERVICES);
		return {
			mySQlConfig : env['mysql-5.1'][0].credentials,
			redisConfig : env['redis-2.2'][0].credentials
		}
	}else{
		return false;
	}
}
exports.getRedisInstance = function(express){
	var RedisStore = require('connect-redis')(express),
	redis = require('redis').createClient(),
	production = appfogProduction();
	var options = (production && production.redisConfig) || {host:'localhost',port:6379,client:redis};
	return new RedisStore(options);
};

/*
	MongoDB 数据库连接
*/
exports.MongoDB = (function(){
	var singleDB = null;
	function constructor(){
		var DB = require('mongodb').Db,
			Connection = require('mongodb').Connection,
			Server = require('mongodb').Server,
			BSON = require('mongodb').BSON,
			ObjectID = require('mongodb').ObjectID;
		var serverice = new Server('localhost',27017,{auto_reconnect:true});
		singleDB = new DB('adminlist',serverice);
		singleDB.open(function(err,singleDB){
			if(!err){
				console.log("connected to 'adminlist' database");
			}else{
				console.log("connection failed");
			}
		});
		return singleDB;
	}
	return {
		getDB:function () {
			if(!singleDB){
				singleDB = constructor();
			}
			return singleDB;
		}
	}
})();

/*
	MySQL 数据库连接
*/

exports.MySQL = (function(){
	var pool = null; 
	function constructor(){
		var production = appfogProduction();
		var options = (production && production.mySQlConfig) || {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: '',
			database: 'tastycloud'
		};
		var mysql      = require('mysql');
		pool = mysql.createPool(options);
		return pool;
	};
	return {
		getMySQLPool:function () {
			if(!pool){
				pool = constructor();
			}
			return pool;
		}
	}
})();

/*
	数据库操作工具
*/
var DBHelper = {};
//将传入的Model object 转换成增删改查的SQL语句
DBHelper.objectToSqlStr = function(obj,table,action){
	var sql='',
	 	keys = [],
		values = [];		
	for(key in obj){
		keys.push(key);
		values.push('"'+obj[key]+'"');
	}
	if(obj && !obj.id && action===undefined){//新建
		sql = 'INSERT INTO '+table+' ('+keys.join(',')+') VALUE('+values.join(',')+')';
	}else if(obj && obj.id && action===undefined){
		sql = 'UPDATE '+table+' SET ';
		for(var i=0;i<keys.length;i++){//更新
			sql += keys[i]+'='+values[i]+''+(i==(keys.length-1)?'':',');
		}
		sql +=' WHERE id='+obj.id;
	}else if(obj && obj.id && action == 'delete'){//删除
		sql +=' DELETE FROM '+table+' WHERE id='+obj.id;
	}
	return sql;
}
exports.DBHelper = DBHelper;
