var db = require('./db_model.js');

db.connect(function() {
  console.log('mysql connection is established');
});

var pool = db.get_pool();

exports.get_departments_by_ids = function(ids, done) {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  my_query = "SELECT * FROM `departments`";

  if (ids.length > 0) {
    my_query += " WHERE id IN (" + ids.join(',') + ");";
  }

  pool.query(my_query, function(error, result) {
    if (error) {
      return done(error);
    }
    done(null, result);
  });
}

exports.insert_into_departments = function(data, done) {
  if (data['name'] === undefined) {
    done('name is required');
    return;
  } else if (data['description'] === undefined) {
    done('description is required');
    return;
  }

  my_query = "INSERT INTO `departments` (`name`, `description`) values ('" + data['name'] + "', '" + data['description'] + "');";
  pool.query(my_query, function(error, result) {
    if (error) {
      done(error);
      return;
    }
    done(null, result);
  });
}

exports.update_department_by_id = function(data, done) {
  if (data['id'] === undefined) {
    done('id is required');
    return;
  }

  my_query = "UPDATE `departments` SET ";

  if (data['name'] !== undefined) {
    my_query += "`name` = '" + data['name'] + "'";
  }
  if (data['description'] !== undefined) {
    my_query += (data['name'] !== undefined) ? ', ' : ' ';
    my_query += "`description` = '" + data['description'] + "'";
  }

  if (data['name'] === undefined && data['description'] === undefined) {
    done('update data is required');
    return;
  }

  my_query += " WHERE id = " + data['id'] + ";";

  pool.query(my_query, function(error, result) {
    if (error) {
      done(error);
      return;
    }
    done(null, result);
  });
}

exports.delete_departments_by_ids = function(ids, done) {
  if (ids === undefined) {
    done('id is required');
    return;
  }
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  my_query = "DELETE FROM `departments` WHERE id IN (" + ids.join(',') + ");";

  pool.query(my_query, function(error, result) {
    if (error) {
      return done(error);
    }
    done(null, result);
  });
}