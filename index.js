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
        choices:["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee","Update Employee Role","Update Employee Manager","View All Roles","Add Role","Remove Role","View All Departments","Add Department","Remove Department","View Utilized Budget By Department","Quit"]
    },
    {
        name:'title',
        message:"what is the title?",
        type:"input",
        when:function(answers){
            if(answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'artist',
        message:"which artist?",
        type:"input",
        when:function(answers){
            if(answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'genre',
        message:"which genre?",
        type:"input",
        when:function(answers){
            if(answers.choice==="query by genre" ||answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    }
]).then(function(answers){
        if(answers.choice==="See all songs"){
            readDb();
        }
        else if(answers.choice==="query by genre"){
          selectByGenre(answers.genre)
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