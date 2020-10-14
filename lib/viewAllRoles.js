// Dependencies
// ===========================================================
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This creates a table view of all roles in alphabetical oder
// ===========================================================
function viewAllRoles(promptUser) {
    connection.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

// Exporting function for viewing all roles
// ===========================================================
module.exports = viewAllRoles;