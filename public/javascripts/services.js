clients.factory('alerts', function() {

	var alerts = {};
	
	alerts.switchBtn = function(state){
		return state = !state;
	};
	
	return alerts;
	
});

clients.factory('windowControl', function(){
	windowBack = function() { 
    window.history.back();
	};
});