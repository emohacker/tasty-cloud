
exports.index = function(req, res) {
	var user = req.session.userInfo;
	if(user) {
		res.render('index', {
			title: "home",
			user: user
		});
	} else {
		res.redirect('/login');
	}
}
exports.login = function(req,res){
	var user = req.session.userInfo;
	if(user) {
		res.redirect('/');
	} else {
		res.render('login',{title:"login"});
	}
}
exports.logout = function(req,res){
	req.session.userInfo = null;
	res.redirect('/');
}