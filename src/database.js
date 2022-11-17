const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "new_scrum_board",
});


function getConnection() {
  return connection;
}

module.exports = { getConnection };