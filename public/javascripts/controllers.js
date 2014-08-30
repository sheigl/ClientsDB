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


clients.controller('projectController', function($scope, $routeParams, dbData, alerts, windowControl){
	$scope.ID = $routeParams.ID;
	
	
});

clients.controller('deleteController', function($scope, $routeParams, dbData, alerts, windowControl){
	
	$scope.ID = $routeParams.ID;
	
	$scope.back = windowBack;
	
	$scope.deleteClient = function(id){
	console.log(id);
	dbData.deleteClient(id)
		.success(function(){
			console.log('deleted', id);
			back();
		}).
		error(function(error){
			$scope.status = 'Unable to delete client: ' + error.message;
		});
	};
	
});



clients.controller('clientDetails', function ($scope, $routeParams, dbData) {

	$scope.formData = {};
    $scope.singleClient = [];
    $scope.allProjects = [];
	var insertData = {'clientProjects':[$scope.formData]};
	
	    dbData.singleClient($routeParams.ID).success(function(data){
		    console.log($routeParams.ID);
		    $scope.singleClient = data;
		    $scope.allProjects = data.clientProjects;
		    console.log(insertData);
	    });

console.log(insertData);
   
        
    $scope.addProject = function(){
	    dbData.updateClient($routeParams.ID, insertData)
            .success(function () {
            $scope.allProjects.push($scope.formData);
            console.log('Pushed', $scope.formData);
            $scope.formData = {};
        }).
        error(function(error) {
            $scope.status = 'Unable to insert: ' + error.message;
        });
    };


});

clients.controller('clientData', function ($scope, $routeParams, dbData) {
    
    $scope.ID = $routeParams.ID;

    
    $scope.dbClients = [];
    dbData.getClients().success(function(data){
	    $scope.dbClients = data;
	    console.log('run get clients');
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
    
    $scope.nextID = [];
    
    function getNextID () {
    dbData.getClients().success(function(data){
	    var i;
	    for(i = 0;i < data.length;i++){
	    console.log(data[i].clientID);
		    if(typeof data[i].clientID === 'undefined'){
			    $scope.nextID = 1001;
		    } else {
			$scope.nextID = data[i].clientID + 1;
			console.log('the next client ID is', $scope.nextID);  
		    };
	    };
    });
    };
    
    getNextID();
    
    $scope.formData = {};
    var client = $scope.formData;
    
    $scope.insertClient = function(){
        getNextID();
        client['clientID'] = $scope.nextID
        dbData.insertClient(client)
            .success(function () {
                $scope.status = 'Inserted Client! Refreshing client list.';
                $scope.dbClients.push(client);
                console.log('Pushed', client);
                $scope.formData = {};
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