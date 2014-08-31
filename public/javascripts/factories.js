clients.factory('dbData', function($http) {

	var urlBase = 'api/clients';
	var dbData = {};
	
	dbData.getClients = function(){
		return $http.get(urlBase);
	};
	
	dbData.insertClient = function(client){
		return $http.post(urlBase, client);
	};
	
	dbData.singleClient = function(client_id){
		return $http.get(urlBase + '/' + client_id);
	};
	
	dbData.projects = function(client_id){
		return $http.get(urlBase + '/' + client_id + '/' + 'projects');
	};
	
	dbData.project = function(client_id, project_id){
		return $http.get(urlBase + '/' + client_id + '/' + 'projects' + '/' + project_id);
	};
	
	dbData.activites = function(client_id, project_id){
		return $http.get(urlBase + '/' + client_id + '/' + 'projects' + '/' + project_id + '/' +'activity');
	};
	
	dbData.activity = function(client_id, project_id, activity_id){
		return $http.get(urlBase + '/' + client_id + '/' + 'projects' + '/' + project_id + '/' +'activity' + '/' + activity_id);
	};
	
	dbData.updateClient = function(client_id, data){
		return $http.put(urlBase + '/' + client_id, data)
	};
	
	dbData.deleteClient = function(id){
		return $http.delete(urlBase + '/' + id);
	};
	
	return dbData;
	
});