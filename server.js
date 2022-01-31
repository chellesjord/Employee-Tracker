// packages needed for the application
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const inputCheck = require('./utils/inputCheck');
const mySQLlogin = require('./password.js');

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        user: mySQLlogin.mysql.user,
        password: mySQLlogin.mysql.password,
        database: 'employeetracker',
    },
    console.log('Connected to the employeetracker database.')
);

//array of questions for user input
const promptUser = UserData => {
    return inquirer.prompt([
        {
            type: "list",
            name: "taskOptVAU",
            message: `What action would you like to take?`,
            choices: ["View Departments", "View Roles", "View Employees",
                "Add Department", "Add Roles", "Add Employees",
                "Update Department", "Update Roles", "Update Employees", "EXIT"]
        }
    ]).then(function (res) {
        //switch case statements to help sort which funtion to go to depending on which selection the user chooses.
        switch (res.taskOptVAU) {
            case "View Departments":
                viewDepart();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmp();
                break;
            case "Add Department":
                addDepart();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employees":
                addEmp();
                break;
            case "Update Department":
                upDepart();
                break;
            case "Update Roles":
                upRole();
                break;
            case "Update Employees":
                upEmp();
                break;
            case "EXIT":
                console.log("See you again soon.");
                break;
            default:
                console.log("Please select a valid option");
                break;
        };
    });
};

//function if user selects a view department option
function viewDepart() {
    db.query(`SELECT name, id FROM departments`, (err, rows) => {
        console.table(rows);
    });
    promptUser()
};

//function if user selects a view role option
function viewRole() {
    db.query(`SELECT * FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`, (err, rows) => {
        console.table(rows);
    });
};

//function if user selects a view employees option
function viewEmp() {
    db.query(`SELECT id AS EmployeeID, first_name AS First Name, last_name AS Last Name  FROM employees
    LEFT JOIN departments ON roles.department_id = departments.id`, (err, rows) => {
        console.table(rows);
    });
};

//Function to initialize app
function init() {
    //start promptUser to get information about the Employee Tables
    promptUser()
    //then get the UserDAta and send it to fuctions to updates Employee tables function
    // .then(userData => {
    //     return tableNewEdits(userData);
    // });
};

//function call to initialize app
init();

// //GET a single candidate
// db.query(`SELECT * FROM employee WHERE id=1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

//GET route that's not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});