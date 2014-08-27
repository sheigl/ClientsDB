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
var Client = require('./app/models/schema.js');
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
			client.clientProjects = req.body.clientProjects;
		
		// save and error check
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
		});
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
		
	})

// Update Client Via ID
	.put(function(req, res) {

		Client.findById(req.params.client_id, function(err, client) {

			if (err)
				res.send(err);

			client.clientID = req.body.clientID;
			client.clientCompanyName = req.body.clientCompanyName;
			client.clientContactFirstName = req.body.clientContactFirstName;
			client.clientContactLastName = req.body.clientContactLastName;
			client.clientEmail = req.body.clientEmail;
			client.clientAddress = req.body.clientAddress;
			client.clientWorkPhone = req.body.clientWorkPhone;
			client.clientMobilePhone = req.body.clientMobilePhone;
			client.clientProjects = req.body.clientProjects;

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
