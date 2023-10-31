var app = angular.module("myApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
	    .state('PayHome', {
            url: '/home',
            templateUrl: '/home/homepage/home.html',
            controller: 'HomePageController'
        }) 
		.state('Dashboard', {
            url: '/dashboard',
            templateUrl: '/home/login/dashboard.html',
            controller: 'DashboardController'
        }) 
        .state('Dashboard.PayWind', {
            url: '/paywind',
            templateUrl: '/home/login/paywind.html',
            controller: 'HomeController'
        })    
		.state('Register', {
            url: '/register',
			templateUrl: '/home/Register/register.html',
			controller: 'RegisterController'
		})
		.state('LogIn', {
            url: '/login',
            templateUrl: '/home/homepage/login.html',
            controller: 'LogInController'
        }) 
		.state('AddAccount', {
            url: '/addaccount',
			templateUrl: '/home/Register/bankaccount.html',
			controller: 'AccountController'
		})
		.state('Dashboard.SplitBill', {
            url: '/splitbill',
			templateUrl: '/home/login/bill.html',
			controller: 'BillController'
		})
		.state('SplitBillPayment', {
            url: '/splitbillpayment',
			templateUrl: '/home/login/payment.html',
			controller: 'PaymentController'
		})
		.state('Dashboard.BankAccount', {
            url: '/bankaccount',
			templateUrl: '/home/bank_link/account.html',
			controller: 'BankController'
		})
		.state('CreatePin', {
            url: '/pin',
			templateUrl: '/home/bank_link/pin.html',
			controller: 'PinController'
		})
		.state('Dashboard.Transaction_History', {
            url: '/history',
			templateUrl: '/home/bank_link/transaction.html',
			controller: 'TransactionDetailController'
		})
		.state('History', {
            url: '/historypayment',
			templateUrl: '/home/bank_link/history.html',
			controller: 'HistoryController'
		})
		.state('Dashboard.Message', {
            url: '/message',
			templateUrl: '/home/payment/thistory.html',
			controller: 'MessageController'
		})
		.state('Data', {
            url: '/data',
			templateUrl: '/home/payment/paymentdata.html',
			controller: 'DataController'
		})
		.state('Dashboard.Transaction', {
            url: '/transaction',
			templateUrl: '/home/payment/transaction.html',
			controller: 'TransactionController'
		})
		.state('Dashboard.Groups', {
            url: '/groups',
			templateUrl: '/home/payment/billgroups.html',
			controller: 'GroupsController'
		})
		.state('Dashboard.BillPayment', {
            url: '/billpayment',
			templateUrl: '/home/payment/billpayment.html',
			controller: 'GroupBillController'
		})
		.state('Dashboard.Cashback', {
            url: '/cashback',
			templateUrl: '/home/login/cashback.html',
			controller: 'CashbackController'
		})
		.state('Dashboard.Profile', {
            url: '/profile',
			templateUrl: '/home/login/profile.html',
			controller: 'ProfileController'
		})
		.state('Dashboard.WalletHome', {
            url: '/wallet',
			templateUrl: '/home/wallet/wallethome.html',
			controller: 'WalletController'
		})
		.state('Dashboard.WalletTran', {
            url: '/wallettransaction',
			templateUrl: '/home/wallet/wallet_trans.html',
			controller: 'WalletTransactionController'
		})
		.state('Dashboard.Postpaid', {
            url: '/postpaid',
			templateUrl: '/home/wallet/postpaid.html',
			controller: 'PostpaidController'
		})
		.state('Dashboard.Cibil', {
            url: '/cibil',
			templateUrl: '/home/wallet/cibil.html',
			controller: 'CibilController'
		})
		
		$urlRouterProvider.otherwise('/home');
}]);

var ip = "https://10.21.81.228:8000/";