const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function viewAllDepartments(promptUser) {
    connection.query(`SELECT id,name AS department FROM department ORDER BY department.name;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

module.exports = viewAllDepartments;