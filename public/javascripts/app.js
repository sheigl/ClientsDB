var clients = angular.module('clients', ['ngRoute']);

clients.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    	.when('/', 
        {
            controller: 'homeController',
            templateUrl: 'partials/home.html'
        })
        .when('/about', 
        {
            controller: 'aboutController',
            templateUrl: 'partials/home.html'
        })	
        .when('/contact', 
        {
            controller: 'contactController',
            templateUrl: 'partials/home.html'
        })			
        .when('/viewclients', 
        {
            controller: 'clientData',
            templateUrl: 'partials/viewclients.html'
        })
        .when('/details/:ID',
        {
            controller: 'clientData',
            templateUrl: 'partials/clientdetails.html'
        })
        .otherwise({ redirectTo: '/home.html' });
}]);