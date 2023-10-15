var app = angular.module("myApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
        .state('PayWind', {
            url: '/paywind',
            templateUrl: '/home/homepage/paywind.html',
            controller: 'HomeController'
        })    
		.state('Register', {
            url: '/register',
			templateUrl: '/home/Register/register.html',
			controller: 'RegisterController'
		})
		.state('AddAccount', {
            url: '/addaccount',
			templateUrl: '/home/Register/bankaccount.html',
			controller: 'AccountController'
		})
		.state('SplitBill', {
            url: '/splitbill',
			templateUrl: '/home/homepage/bill.html',
			controller: 'BillController'
		})
		
		$urlRouterProvider.otherwise('/paywind');
}]);
