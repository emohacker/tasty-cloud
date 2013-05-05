//var db = require('./db').MongoDB.getDB();
var dbPool = require('../libs/db').MySQL.getMySQLPool();
exports.auth= function(req,res,next){
	if (req.session.userInfo) {
		return next();
	}else{
		res.redirect('/');
	}
};
/*
	登录验证接口
*/
exports.authFromClient = function(req,res){
	var crypto = require('crypto'),
		hasher = crypto.createHash('md5'),
		username = req.body.username,
		password = req.body.password;
	hasher.update(password);
	password = hasher.digest('hex');
	dbPool.getConnection(function(err,connection){
		var sql = 'SELECT * FROM tasty_user WHERE username = '
			+ connection.escape(username)
			+ ' AND password = '+connection.escape(password);
		connection.query(sql,function(err,rows){
			if(!err){
				if(rows.length==1){
					var userInfo = rows[0];
					sql = 'SELECT * FROM tasty_function ORDER BY ordering ASC';
					connection.query(sql,function(err,rows){
						if(!err){
							userInfo.functions = rows;
							req.session.userInfo = userInfo;
							res.send('authored');
						}else{
							res.send(-1);
						}
						connection.end();
					});
				}else{
					res.send('incorrect');
				}
			}else{
				res.send(-1);	
			}
		});
	});
	
};