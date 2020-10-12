const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptUser();
});

function promptUser(){
    inquirer.prompt([
        {
        name:"choice",
        message:"What would like to do?",
        type:"list",
        choices:["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee","Update Employee Role","Update Employee Manager","View All Roles","View All Roles by Department","Add Role","Remove Role","Update Role Department","Update Role Salary","View All Departments","Add Department","Remove Department","View Utilized Budget By Department","Quit"]
    }
]).then(function(answers){
        switch (answers.choice) {
            case "View All Employees":
                console.log("viewAllEmployees");
                break;
            case "View All Employees By Department":
                console.log("viewAllEmployeesByDepartment");
                break;
            case "View All Employees By Manager":
                console.log("viewAllEmployeesByManager");
                break;
            default:
                break;
        }


        if(answers.choice==="View All Employees"){
            viewAllEmployee();
        }
        else if(answers.choice==="query by genre"){
            (answers.genre)
        }
        else if(answers.choice==="Hear Baby Shark"){
           insertBabyShark();
        }
        else if(answers.choice==="add custom song"){
            addCustomSong(answers.title,answers.artist,answers.genre);
        }
        else if(answers.choice==="Quit"){
            connection.end()
        }
    })
}