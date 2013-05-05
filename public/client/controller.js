/*
	登录页表单处理
*/
function LoginForm($scope,$http){
	$scope.form = {
		username:'',
		password:''
	};
	$scope.login = function(){
		$http({
			method:"POST",
			url:'/api/login/auth',
			data:$scope.form
		}).success(function(data,status){
			if(status==200 && data=="authored"){
				window.location = '/';
			}else if(data=="incorrect"){
				$scope.showerr = 'block';
				$scope.error = '用户名密码错误，请重新输入'
			}else{
				$scope.error = '系统异常，请稍候再试'
			}
		});
	};
}

/*
	初始化列表中$scope的一些通用方法
*/
function scopeInitial($scope,Model){
	$scope.editLabel = '新增';
	$scope.orderby = 'id-desc';
	$scope.currentPage = 1;
    $scope.pageSize = 10;
	//载入列表数据
	$scope.updateList = function (){
		$scope.list = Model.query({
			orderby:$scope.orderby,
			page:$scope.currentPage,
			limit:$scope.pageSize
		});	
	}
	//获取总记录数
	$scope.listCount = Model.get({
		id:0
	});
	//计算总页数
    $scope.numberOfPages = function(){
    	return Math.ceil($scope.listCount.listcount/$scope.pageSize);
    };
	//上一页
	$scope.prvPage = function(){
		$scope.currentPage -=1;
		$scope.updateList();
	};
	//下一页
	$scope.nextPage = function(){
		$scope.currentPage +=1;
		$scope.updateList();
	};
	//删除记录前，定位删除的记录
	$scope.deleteTarget = function(item){
		$scope.itemIDForDelete = item.id;
	};
	//确定删除记录
	$scope.deleteItem = function(){
		if($scope.itemIDForDelete!==undefined){	
			Model.delete({id:$scope.itemIDForDelete},function(){
				$scope.updateList();
			});
		}
	};
	//新增或修改记录的保存
	$scope.saveItem = function(){
    	var item = new Model($scope.editForm);
    	item.$save((item,function(result){
			if(typeof $scope.resetEditForm == 'function'){
				$scope.resetEditForm();
			}
			$scope.updateList();
    	}));
    };
	return $scope;
}

function MainFrameCtrl($scope){

}
function OrdersCtrl($scope,$http){

}

function ProductCtrl($scope,Product,ProductsCate){
	var d = new Date();
	$scope = scopeInitial($scope,Product);
	$scope.productsCate = ProductsCate.query();
	$scope.editForm = {
		id:0,
		catid:1,
		release_date:$util.timeToDate(d)
	};
	$scope.editTarget = function(item){
		$scope.editLabel = '编辑';
		$scope.editForm.id = item.id;
		$scope.editForm.title = item.title;
		$scope.editForm.initial = item.initial;
		$scope.editForm.catid = item.catid;
		$scope.editForm.price = item.price;
		$scope.editForm.waiter_share = item.waiter_share;
		$scope.editForm.release_date = item.release_date;
	};
	$scope.resetEditForm = function(){
		$scope.editLabel = '新增';
		$scope.editForm.id = 0;
		$scope.editForm.title = null;
		$scope.editForm.initial = null;
		$scope.editForm.catid = $scope.productsCate[0].id;
		$scope.editForm.price = null;
		$scope.editForm.waiter_share = null;
		$scope.editForm.release_date = d.getTime();
	}
	$scope.updateList();
}


function ProductCateCtrl($scope,ProductsCate,Department){
	$scope = scopeInitial($scope,ProductsCate);
	$scope.departments = Department.query();
	$scope.editForm = {id:0,departid:1};
	$scope.editTarget = function(item){
		$scope.editLabel = '编辑';
		$scope.editForm.id = item.id;
		$scope.editForm.title = item.title;
		$scope.editForm.departid = item.departid;
	};
	$scope.resetEditForm = function(){
		$scope.editLabel = '新增';
		$scope.editForm.id = 0;
		$scope.editForm.title = null;
		$scope.editForm.departid = 1;
	}
	$scope.updateList();
}


function StatisticsCtrl($scope,$http){

}
function VipserviceCtrl($scope,$http){

}
function MembersCtrl($scope,$http){

}
function PssCtrl($scope,$http){

}

function RoleCtrl($scope,$http){

}
function UserCtrl($scope,$http){

}
function DepartmentCtrl($scope,$http){

}
       