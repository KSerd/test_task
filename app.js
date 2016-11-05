var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

var db = require('./departments_db_model.js');

router.route('/departments').get(function (req, res) {
	db.get_departments_by_ids([], function(error, result) {
		var message = '';
		if (error) {
			message = 'Failed to get departments';
			res.send({status: 0, data: [], message: message});
		} else {
			message = 'Success';
			res.send({status: 1, data: result, message: message});
		}
		console.log(message);
	});
});

router.route('/department/:id').get(function (req, res) {
	db.get_departments_by_ids(req.params.id, function(error, result) {
		var message = '';
		if (error) {
			message = 'Failed to get department by id';
			res.send({status: 0, data: [], message: message});
		} else {
			message = 'Success';
			res.send({status: 1, data: result, message: message});
		}
		console.log(message);
	});
});

router.route('/department').post(function (req, res) {
	if (req.body.name === undefined) {
		res.send({status: 0, data: [], message: 'name is required'});
		return;
	}
	if (req.body.description === undefined) {
		res.send({status: 0, data: [], message: 'description is required'});
		return;
	}

	db.insert_into_departments(req.body, function(error, result) {
		var message = '';
		if (error) {
			message = 'Failed to add department';
			res.send({status: 0, data: [], message: message});
		} else {
			message = 'Success';
			res.send({status: 1, data: {insertId: result['insertId']}, message: message});
		}
		console.log(message);
	});
});

router.route('/department').put(function (req, res) {
	if (req.body.id === undefined) {
		res.send({status: 0, data: [], message: 'id is required'});
		return;
	}
	if (req.body.name === undefined && req.body.description === undefined) {
		res.send({status: 0, data: [], message: 'update data is required'});
		return;
	}

	db.update_department_by_id(req.body, function(error, result) {
		var message = '';
		if (error) {
			message = 'Failed to update department';
			res.send({status: 0, data: [], message: message});
		} else {
			message = 'Success';
			res.send({status: 1, data: [], message: message});
		}
		console.log(message);
	});
});

router.route('/department/:id').delete(function (req, res) {
	db.delete_departments_by_ids(req.params.id, function(error, result) {
		var message = '';
		if (error) {
			message = 'Failed to update department';
			res.send({status: 0, data: [], message: message});
		} else {
			message = 'Success';
			res.send({status: 1, data: [], message: message});
		}
		console.log(message);
	});
});

app.listen(3000);