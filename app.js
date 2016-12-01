'use strict';

var app = angular.module('app',['auth0','angular-storage', 'angular-jwt', 'ui.router', 'ng-sortable','ngMaterial'])

app.config(['$provide', 'authProvider','$stateProvider','$httpProvider','$urlRouterProvider','$locationProvider','jwtInterceptorProvider','store', function($provide, authProvider, $stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, jwtInterceptorProvider,store) {

	   $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'components/home/home.tpl.html',
	    })

	    $stateProvider
	    .state('profile', {
	      url: '/profile',
	      templateUrl: 'components/profile/profile.tpl.html',
	      controller: 'profileController as user'
	    });
	    
		// Specify URL states here
	   $urlRouterProvider.otherwise('/home');

	   authProvider.init({
	   	domain : AUTH0_DOMAIN,
	   	clientID : AUTH0_CLIENT_ID
	   });

	   jwtInterceptorProvider.tokenGetter = function(){
	   	return store.get('token');
	   }

	   $httpProvider.interceptors.push('jwtInterceptor');

}]);