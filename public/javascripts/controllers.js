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
	
	dbData.project($routeParams.ID, $routeParams.PID).success(function(data){
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
	
	$scope.ID = $routeParams.ID;
	$scope.back = windowBack;
	
	$scope.deleteClient = function(id){
	console.log(id);
	dbData.deleteClient(id)
		.success(function(){
			console.log('deleted', id);
			windowBack(2);
		}).
		error(function(error){
			$scope.status = 'Unable to delete client: ' + error.message;
		});
	};
	
});

clients.controller('clientDetails', function ($scope, $routeParams, dbData) {

	
    $scope.singleClient = [];
    $scope.allProjects = [];
	
	    dbData.singleClient($routeParams.ID).success(function(data){
		    console.log($routeParams.ID);
		    $scope.singleClient = data;
	    });
	    
	    dbData.projects($routeParams.ID).success(function(data){
		    $scope.allProjects = data;
	    });   


});

clients.controller('createClient', function ($scope, $routeParams, dbData, windowControl) {
	
	$scope.nextID = [];
    
    function getNextID () {
    dbData.getClients().success(function(data){
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
    var client = $scope.formData;
    
    $scope.insertClient = function(){
        getNextID();
        client['clientID'] = $scope.nextID
        dbData.insertClient(client)
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
    
    $scope.ID = $routeParams.ID;
    
    $scope.dbClients = [];
    dbData.getClients().success(function(data){
	    $scope.dbClients = data;
    });
	
});