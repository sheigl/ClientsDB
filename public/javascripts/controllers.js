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
    
    $scope.ID = $routeParams.ID;

    
    $scope.dbClients = [];
    dbData.getClients().success(function(data){
	    $scope.dbClients = data;
	    console.log('run get clients');
    });
    
    var oneClient = $routeParams.ID;
    $scope.singleClient = [];
	$scope.projectData = [];
	
    function clientData(){
	    dbData.singleClient(oneClient).success(function(data){
		    console.log(oneClient);
		    $scope.singleClient = data;
		    $scope.allProjects = data.clientProjects
		    console.log('run got the client', data);
	    });
    };
    
    if (typeof $routeParams.ID === 'undefined'){
		 console.log('no client to get');
	   } else {
		  clientData();
	   }
    
    $scope.projectData = {};
    var project = $scope.projectData;
    
    $scope.addProject = function(){
	    $scope.allProjects.push(project);
	    console.log(project);
    };
    
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
		    if(typeof data[i].clientID === 'undefined'){
			    $scope.nextID = 1001;
		    } else if(data[i].clientID === (data.length + 1000)){
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