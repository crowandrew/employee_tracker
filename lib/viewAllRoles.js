require("console.table");
const connection = require("../data/connection");

function viewAllRoles(promptUser) {
    connection.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

module.exports = viewAllRoles;