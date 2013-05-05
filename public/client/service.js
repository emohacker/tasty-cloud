'use strict';

angular.module('TcService', ['ngResource']).
factory('ProductsCate', function($resource){
	var instance = $resource('/api/productcate/:orderby/:page/:limit/:id', {orderby:'@orderby',page:'@page',limit:'@limit'}, {
		'get':    {method:'GET'},
		'save':   {method:'POST'},
	  	'query':  {method:'GET',isArray:true},
		'delete': {method:'DELETE'}
	});
	return instance;
}).
factory('Product', function($resource){
	var instance = $resource('/api/product/:orderby/:page/:limit/:id', {orderby:'@orderby',page:'@page',limit:'@limit'}, {
		'get':    {method:'GET'},
		'save':   {method:'POST'},
	  	'query':  {method:'GET',isArray:true},
		'delete': {method:'DELETE'}
	});
	return instance;
}).
factory('Department', function($resource){
	var instance = $resource('/api/department/:orderby/:page/:limit/:id', {orderby:'@orderby',page:'@page',limit:'@limit'}, {
		'get':    {method:'GET'},
		'save':   {method:'POST'},
	  	'query':  {method:'GET',isArray:true},
		'delete': {method:'DELETE'}
	});
	return instance;
});

angular.module('GlobalFilter', []).filter('pageStart', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
