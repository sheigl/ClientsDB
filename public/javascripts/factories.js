clients.factory('dbData', function($http) {

	var urlBase = 'api/clients';
	var dbData = {};
	
	dbData.getClients = function(){
		return $http.get(urlBase);
	};
	
	dbData.insertClient = function(client){
		return $http.post(urlBase, client);
	};
	
	/*dbData.getClients = function(id){
		return $http.get(urlBase + '/' + id);
	};
	
	dbData.updateClient = function(client){
		return $http.put(urlBase + '/' + clientID, client)
	};
	
	dbData.deleteClient = function(id){
		return $http.delete(urlBase + '/' + id);
	};*/
	
	return dbData;
	
});