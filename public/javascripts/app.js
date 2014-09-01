var clients = angular.module('clients', ['ngRoute']);

clients.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    	.when('/', 
        {
            controller: 'usersController',
            templateUrl: 'partials/home.html'
        })
        .when('/:user_id', 
        {
            controller: 'usersController',
            templateUrl: 'partials/home.html'
        })
        .when('/:user_id/clients', 
        {
            controller: 'clientData',
            templateUrl: 'partials/viewclients.html'
        })
        .when('/:user_id/clients/create', 
        {
            controller: 'createClient',
            templateUrl: 'partials/createclient.html'
        })
        .when('/:user_id/clients/details/:client_id',
        {
            controller: 'clientDetails',
            templateUrl: 'partials/clientdetails.html'
        })
        .when('/:user_id/clients/details/:client_id/delete',
        {
            controller: 'deleteController',
            templateUrl: 'partials/delete.html'
        })
        .when('/:user_id/clients/details/:client_id/projects/:project_id',
        {
	     	controller: 'projectController',
	     	templateUrl: 'partials/projects.html'   
        })
        .when('/:user_id/clients/details/:client_id/projects/:project_id/delete',
        {
            controller: 'deleteController',
            templateUrl: 'partials/delete.html'
        })
        .when('/:user_id/clients/details/:client_id/projects/:project_id/activities/:activity_id',
        {
	     	controller: 'projectController',
	     	templateUrl: 'partials/activites.html'   
        })
        .when('/:user_id/clients/details/:client_id/projects/:project_id/activities/:activity_id/delete',
        {
            controller: 'deleteController',
            templateUrl: 'partials/delete.html'
        })
        .otherwise({ redirectTo: '/' });
}]);