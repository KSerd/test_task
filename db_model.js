var mysql = require('mysql');

var db_name = 'test_task_db';
var host = '';
var user = '';
var password = '';
var pool = null;

exports.connect = function(done) {
  pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: db_name
  });
  done();
}

exports.get_pool = function(done) {
  return pool;
}