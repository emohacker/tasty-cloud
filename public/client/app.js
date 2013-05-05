'use strict';
angular.module('tastycloud',['TcService','GlobalFilter']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {templateUrl: 'tpl/index.html',   controller: OrdersCtrl}).
		when('/orders', {templateUrl: 'tpl/orders/list.html',   controller: OrdersCtrl}).
		when('/orders/detail', {templateUrl: 'tpl/orders/detail.html',   controller: OrdersCtrl}).
		when('/product', {templateUrl: 'tpl/product.html', controller: ProductCtrl}).
		when('/productcate', {templateUrl: 'tpl/productcate.html', controller: ProductCateCtrl}).
		when('/statistics', {templateUrl: 'tpl/statistics.html', controller: StatisticsCtrl}).
		when('/vipservice', {templateUrl: 'tpl/vipservice.html',   controller: VipserviceCtrl}).
		when('/members', {templateUrl: 'tpl/members.html', controller: MembersCtrl}).
		when('/pss', {templateUrl: 'tpl/pss.html',   controller: PssCtrl}).
		when('/role', {templateUrl: 'tpl/sys/role.html', controller: RoleCtrl}).
		when('/user', {templateUrl: 'tpl/sys/user.html', controller: UserCtrl}).
		when('/department', {templateUrl: 'tpl/sys/department.html', controller: DepartmentCtrl}).
      	otherwise({redirectTo: '/'});
}]);
