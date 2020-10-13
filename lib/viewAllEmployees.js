const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function viewAllEmployees(callback) {
    connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id ORDER BY emp.id`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        callback();
    })
}

module.exports = viewAllEmployees;