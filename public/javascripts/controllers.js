clients.controller('homeController', function($scope){
	
	$scope.welcomeMessage = 'Hello World! This is a testing space for AngularJS development';
	
});

clients.controller('aboutController', function($scope){
	
	$scope.welcomeMessage = 'Hello World! About Page. This is a testing space for AngularJS development';
	
});

clients.controller('contactController', function($scope){
	
	$scope.welcomeMessage = 'Hello World! Contact Page. This is a testing space for AngularJS development';
	
});

clients.controller('navController', function($scope){
	$scope.nav = ['Home','About','Contact', 'viewclients'];
});

clients.controller('clientData', function ($scope, $routeParams, dbData) {
    
    $scope.formData = {};
    var client = $scope.formData;
    
    $scope.dbClients = [];
    dbData.getClients().success(function(data){
	    $scope.dbClients = data;
    });
    
    /*$scope.updateClient = function (id) {
        var client;
        for (var i = 0; i < $scope.dbClients.length; i++) {
            var currClients = $scope.dbClients[i];
            if (currClients.ID === id) {
                cust = currClients;
                break;
            }
        }

        dbData.updateClient(client)
          .success(function () {
              $scope.status = 'Updated Clients! Refreshing customer list.';
          })
          .error(function (error) {
              $scope.status = 'Unable to update client: ' + error.message;
          });
    };*/
    
    $scope.insertClient = function(){
        dbData.insertClient(client)
            .success(function () {
                $scope.status = 'Inserted Client! Refreshing client list.';
                $scope.dbClients.push(client);
                console.log('Pushed', client);
            }).
            error(function(error) {
                $scope.status = 'Unable to insert client: ' + error.message;
            });
	};
	
	/*$scope.deleteClient = function (id) {
        dbData.deleteClient(id)
        .success(function () {
            $scope.status = 'Deleted Client! Refreshing customer list.';
            for (var i = 0; i < $scope.dbClients.length; i++) {
                var client = $scope.dbData[i];
                if (client.ID === id) {
                    $scope.dbClients.splice(i, 1);
                    break;
                }
            }
        })
        .error(function (error) {
            $scope.status = 'Unable to delete client: ' + error.message;
        });
    };*/
});