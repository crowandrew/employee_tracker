require("console.table");
const connection = require("../data/connection");

function viewAllEmployees(promptUser) {
    connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id ORDER BY emp.id`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

module.exports = viewAllEmployees;