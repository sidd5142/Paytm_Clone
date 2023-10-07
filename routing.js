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
		// .state('LogIn', {
        //     url: '/login',
		// 	templateUrl: '/home//login.html',
		// 	controller: 'LogInController'
		// })
		
		$urlRouterProvider.otherwise('/paywind');
}]);
