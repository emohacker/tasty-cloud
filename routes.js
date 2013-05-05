var initial = require('./routes/initial');
var acl = require('./routes/acl');
var productCate = require('./routes/productcate');
var product = require('./routes/product');
var department = require('./routes/department');

module.exports = function(app) {
	app.get('/', initial.index);
	app.get('/login', initial.login);
	app.get('/api/logout', initial.logout);
	app.post('/api/login/auth', acl.authFromClient);
	//出品类别管理
	app.get('/api/productcate/:orderby/:page/:limit', acl.auth, productCate.query);
	app.get('/api/productcate/:id', acl.auth, productCate.query);
	app.get('/api/productcate', acl.auth, productCate.query);
	app.post('/api/productcate', acl.auth, productCate.save);
	app.delete('/api/productcate/:id', acl.auth, productCate.delete);

	//出品管理
	app.get('/api/product/:orderby/:page/:limit', acl.auth, product.query);
	app.get('/api/product/:id', acl.auth, product.query);
	app.post('/api/product', acl.auth, product.save);
	app.delete('/api/product/:id', acl.auth, product.delete);

	//出品部门管理
	app.get('/api/department/:orderby/:page/:limit', acl.auth, department.query);
	app.get('/api/department/:id', acl.auth, department.query);
	app.get('/api/department', acl.auth, department.query);
	app.post('/api/department', acl.auth, department.save);
	app.delete('/api/department/:id', acl.auth, department.delete);
};