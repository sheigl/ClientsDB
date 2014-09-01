clients.factory('dbData', function($http) {

	var urlBase = 'api/users';
	var dbData = {};
	
	dbData.getUsers = function(){
		return $http.get(urlBase);
	};
	
	dbData.getClients = function(user_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients');
	};
	
	dbData.insertClient = function(user_id, data){
		return $http.post(urlBase + '/' + user_id + '/' + 'clients', data);
	};
	
	dbData.singleClient = function(user_id, client_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id);
	};
	
	dbData.updateClient = function(user_id, client_id, data){
		return $http.put(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id, data)
	};
	
	dbData.projects = function(user_id, client_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id + '/' + 'projects');
	};
	
	dbData.project = function(user_id, client_id, project_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id + '/' + 'projects' + '/' + project_id);
	};
	
	dbData.activites = function(user_id, client_id, project_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id + '/' + 'projects' + '/' + project_id + '/' +'activity');
	};
	
	dbData.activity = function(user_id, client_id, project_id, activity_id){
		return $http.get(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id + '/' + 'projects' + '/' + project_id + '/' +'activity' + '/' + activity_id);
	};
	
	dbData.deleteClient = function(user_id, client_id){
		return $http.delete(urlBase + '/' + user_id + '/' + 'clients' + '/' + client_id);
	};
	
	return dbData;
	
});