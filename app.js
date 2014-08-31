var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===== API Setup
// ===========================================================================
// Connect to DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbClient');
// Schema
var Client = require('./app/models/clientSchema.js');
var Project = require('./app/models/projectSchema.js');
var Activity = require('./app/models/activitySchema.js');

// Router
var router = express.Router();
router.use(function(req, res, next){
	next(); // make sure we go to the next routes and dont stop here
});
// Use API
// test route
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

app.use('/api', router);
// Route to Clients view

//========= 
//============== Clients

router.route('/clients')
// Create Clients
	.post(function(req, res){
		var client = new Client(); // model
		
			client.clientID = req.body.clientID;
			client.clientCompanyName = req.body.clientCompanyName;
			client.clientContactFirstName = req.body.clientContactFirstName;
			client.clientContactLastName = req.body.clientContactLastName;
			client.clientEmail = req.body.clientEmail;
			client.clientAddress = req.body.clientAddress;
			client.clientWorkPhone = req.body.clientWorkPhone;
			client.clientMobilePhone = req.body.clientMobilePhone;
		
		// save and error check
		console.log(client);
		client.save (function(err){
			if (err)
				res.send(err);
			res.json({ message: 'Client Created!' });
		});
	})

// Get All Clients
	.get(function(req, res){
		Client.find(function(err, client){
			if (err)
				res.send(err);
			
			res.json(client);
		})
	});

// Client Route Via ID
router.route('/clients/:client_id')

// Get Clients Via ID
	.get(function(req, res){
		Client.findById(req.params.client_id, function(err, client){
			if (err)
				res.send(err);
			res.json(client);
		});
		
		// Can't figure out populate function		
		/*Client.findById('54021d048c5064e6df290638').populate('clientProjects').exec(function(err, client){
			console.log('find', client.clientProjects);
		});*/
				
	})

// Update Client Via ID
	.put(function(req, res) {

		Client.findById(req.params.client_id, function(err, client) {

			if (err)
				res.send(err);

			if (req.body.clientID === ''){
				console.log('nothing to populate!');
			} else {
				client.clientID = req.body.clientID;
			};
			
			if (req.body.clientCompanyName === ''){
				console.log('nothing to populate!');
			} else {
				client.clientCompanyName = req.body.clientCompanyName;
			};
			
			if (req.body.clientContactFirstName === ''){
				console.log('nothing to populate!');
			} else {
				client.clientContactFirstName = req.body.clientContactFirstName;
			};
			
			if (req.body.clientContactLastName === ''){
				console.log('nothing to populate!');
			} else {
				client.clientContactLastName = req.body.clientContactLastName;
			};
			
			if (req.body.clientEmail === ''){
				console.log('nothing to populate!');
			} else {
				client.clientEmail = req.body.clientEmail;
			};
			
			if (req.body.clientAddress === ''){
				console.log('nothing to populate!');
			} else {
				client.clientAddress = req.body.clientAddress;
			};
			
			if (req.body.clientWorkPhone === ''){
				console.log('nothing to populate!');
			} else {
				client.clientWorkPhone = req.body.clientWorkPhone;
			};
			
			if (req.body.clientMobilePhone === ''){
				console.log('nothing to populate!');
			} else {
				client.clientMobilePhone = req.body.clientMobilePhone;
			};
						
			console.log(client);
						
			// save and error check
			client.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Client Updated!' });
			});

		});
	})

// Delete Client Via ID
	.delete(function(req, res) {
		Client.remove({
			_id: req.params.client_id
		}, function(err, client) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully Deleted' });
		});
	});

//========= 
//============== Projects

router.route('/clients/:client_id/projects')

// Create Project
	.post(function(req, res){
		var project = new Project(); // model
		
			project._creator = req.params.client_id;
			project.projectName = req.body.projectName;
			project.projectStatus = req.body.projectStatus;
			project.projectDue = req.body.projectDue;
			project.projectStartDate = req.body.projectStartDate;
			project.projectCompletedDate = req.body.projectCompletedDate;
			project.projectNotes = req.body.projectNotes;
			
		
		console.log(project)
		// save and error check
		project.save (function(err){
			if (err)
				res.send(err);
			res.json({ message: 'Project Created!' });
		})
	})
	

// Get All Projects Via Client ID
	.get(function(req, res){
		Project.find({ _creator: req.params.client_id }).exec(function(err, client){
			if (err)
				res.send(err);
			res.json(client);
		});	
	})
	

router.route('/clients/:client_id/projects/:project_id')

// Get Via Project ID
	.get(function(req, res){
		Project.findById(req.params.project_id).exec(function(err, client){
			if (err)
				res.send(err);
			res.json(client);
		});	
	})

// Update Project Via ID
	.put(function(req, res) {

		Project.findById(req.params.project_id, function(err, project) {

			if (err)
				res.send(err);

			if (req.body.projectName === ''){
				console.log('nothing to populate!');
			} else {
				project.projectName = req.body.projectName;
			};
			
			if (req.body.projectStatus === ''){
				console.log('nothing to populate!');
			} else {
				project.projectStatus = req.body.projectStatus;
			};
			
			if (!req.body.projectDue){
				console.log('nothing to populate!');
			} else {
				project.projectDue = req.body.projectDue;
			};
			
			if (!req.body.projectStartDate){
				console.log('nothing to populate!');
			} else {
				project.projectStartDate = req.body.projectStartDate;
			};
			
			if (!req.body.projectCompletedDate){
				console.log('nothing to populate!');
			} else {
				project.projectCompletedDate = req.body.projectCompletedDate;
			};
			
			if (req.body.projectNotes === ''){
				console.log('nothing to populate!');
			} else {
				project.projectNotes = req.body.projectNotes;
			};
									
			console.log(project);
						
			// save and error check
			project.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Project Updated!' });
			});

		});
	})

// Delete Project Via ID
	.delete(function(req, res) {
		Project.remove({
			_id: req.params.project_id
		}, function(err, project) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully Deleted' });
		});
	});

//========= 
//============== Activites

router.route('/clients/:client_id/projects/:project_id/activity')

// Create Project
	.post(function(req, res){
		var activity = new Activity(); // model
		
			activity._creator = req.params.client_id;
			activity._project = req.params.project_id;
			activity.activityName = req.body.activityName;
			activity.activityCategory = req.body.activityCategory;
			activity.activityStartTime = req.body.activityStartTime;
			activity.activityEndTime = req.body.activityEndTime;
			activity.activityTotalTime = req.body.activityTotalTime;
			activity.activityRate = req.body.activityRate;
			activity.activityTotal = req.body.activityTotal;			
		
		console.log(activity)
		// save and error check
		activity.save (function(err){
			if (err)
				res.send(err);
			res.json({ message: 'Activity Created!' });
		})
	})
	

// Get Activity Project Via ID
	.get(function(req, res){
		Activity.find({ _project: req.params.project_id }).exec(function(err, client){
			if (err)
				res.send(err);
			res.json(client);
		});	
	})
	

router.route('/clients/:client_id/projects/:project_id/activity/:activity_id')

// Get Via Activity ID
	.get(function(req, res){
		Activity.findById(req.params.activity_id).exec(function(err, client){
			if (err)
				res.send(err);
			res.json(client);
		});	
	})

// Update Activity Via ID
	.put(function(req, res) {

		Activity.findById(req.params.activity_id, function(err, activity) {

			if (err)
				res.send(err);
			
			if (!req.body.activityName){
				console.log('nothing to populate!');
			} else {
				activity.activityName = req.body.activityName;
			};
			
			if (!req.body.activityCategory){
				console.log('nothing to populate!');
			} else {
				activity.activityCategory = req.body.activityCategory;
			};
			
			if (!req.body.activityStartTime){
				console.log('nothing to populate!');
			} else {
				activity.activityStartTime = req.body.activityStartTime;
			};
			
			if (!req.body.activityEndTime){
				console.log('nothing to populate!');
			} else {
				activity.activityEndTime = req.body.activityEndTime;
			};
			
			if (!req.body.activityTotalTime){
				console.log('nothing to populate!');
			} else {
				activity.activityTotalTime = req.body.activityTotalTime;
			};
			
			if (!req.body.activityRate){
				console.log('nothing to populate!');
			} else {
				activity.activityRate = req.body.activityRate;
			};
			
			if (!req.body.activityTotal){
				console.log('nothing to populate!');
			} else {
				activity.activityTotal = req.body.activityTotal;
			};
												
			console.log(activity);
						
			// save and error check
			activity.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Activity Updated!' });
			});

		});
	})

// Delete Project Via ID
	.delete(function(req, res) {
		Activity.remove({
			_id: req.params.activity_id
		}, function(err, activity) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully Deleted' });
		});
	});
	

// ===== END API Setup
// ===========================================================================

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(3000);
