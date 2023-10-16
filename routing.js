var app = angular.module("myApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
	    .state('PayHome', {
            url: '/home',
            templateUrl: '/home/homepage/home.html',
            controller: 'HomePageController'
        }) 
        .state('PayWind', {
            url: '/paywind',
            templateUrl: '/home/login/paywind.html',
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
			templateUrl: '/home/login/bill.html',
			controller: 'BillController'
		})
		.state('SplitBillPayment', {
            url: '/splitbillpayment',
			templateUrl: '/home/login/payment.html',
			controller: 'PaymentController'
		})
		.state('BankAccount', {
            url: '/bankaccount',
			templateUrl: '/home/bank_link/account.html',
			controller: 'BankController'
		})
		.state('CreatePin', {
            url: '/pin',
			templateUrl: '/home/bank_link/pin.html',
			controller: 'PinController'
		})
		
		$urlRouterProvider.otherwise('/home');
}]);

var ip = "https://10.21.81.242:8000/";

