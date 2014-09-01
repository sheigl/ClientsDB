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
	
	$scope.back = windowBack;
	$scope.project = [];
	$scope.activites = [];
	$scope.formData = {};
	
	dbData.project($routeParams.user_id, $routeParams.client_id, $routeParams.project_id).success(function(data){
	    $scope.project = data;
	});   
	
	dbData.activites($routeParams.ID, $routeParams.PID).success(function(data){
	    $scope.activites = data;
	}); 
	
	
	/*$scope.addProject = function(){
	    dbData.updateClient($routeParams.ID, insertData)
            .success(function () {
            $scope.allProjects.push($scope.formData);
            console.log('Pushed', $scope.formData);
            $scope.formData = {};
        }).
        error(function(error) {
            $scope.status = 'Unable to insert: ' + error.message;
        });
    };*/
	  
        
	
});

clients.controller('deleteController', function($scope, $routeParams, dbData, alerts, windowControl){
	
	$scope.ID = $routeParams.client_id;
	$scope.back = windowBack;
	
	$scope.deleteClient = function(client_id){
	console.log(client_id);
	dbData.deleteClient(client_id)
		.success(function(){
			console.log('deleted', client_id);
			windowBack(2);
		}).
		error(function(error){
			$scope.status = 'Unable to delete client: ' + error.message;
		});
	};
	
});

clients.controller('clientDetails', function ($scope, $routeParams, dbData, windowControl) {

	$scope.back = windowBack;
    $scope.singleClient = [];
    $scope.allProjects = [];
	
	    dbData.singleClient($routeParams.user_id, $routeParams.client_id).success(function(data){
		    console.log($routeParams.client_id);
		    $scope.singleClient = data;
	    });
	    
	    dbData.projects($routeParams.user_id, $routeParams.client_id).success(function(data){
		    $scope.allProjects = data;
	    });   


});

clients.controller('createClient', function ($scope, $routeParams, dbData, windowControl) {
	
	$scope.nextID = [];
    
    function getNextID () {
    dbData.getClients($routeParams.user_id).success(function(data){
	    var i;
	    for(i = 0;i < data.length;i++){
	    //console.log(data[i].clientID);
		    if(!data[i].clientID){
			    $scope.nextID = 1001;
		    } else {
			$scope.nextID = data[i].clientID + 1;
			//console.log('the next client ID is', $scope.nextID);  
		    };
	    };
    });
    };
    
    getNextID();
    
    $scope.formData = {};
    var data = $scope.formData;
    
    $scope.insertClient = function(){
        getNextID();
        client['clientID'] = $scope.nextID
        dbData.insertClient($routeParams.user_id, data)
            .success(function () {
                $scope.status = 'Inserted Client! Refreshing client list.';
                //$scope.dbClients.push(client);
                //console.log('Pushed', client);
                $scope.formData = {};
                windowBack();
            }).
            error(function(error) {
                $scope.status = 'Unable to insert client: ' + error.message;
            });
	};

});

clients.controller('clientData', function ($scope, $routeParams, dbData) {
    
    $scope.dbClients = [];
    dbData.getClients($routeParams.user_id).success(function(data){
	    $scope.dbClients = data;
    });
	
});

clients.controller('usersController', function ($scope, $routeParams, dbData) {
    
    $scope.dbUsers = [];
    dbData.getUsers().success(function(data){
	    $scope.dbUsers = data;
    });
	
});