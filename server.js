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
    console.log(`
    |-------------------------------------|
    |-----Welcome to Employee Tracker-----|
    |-------------------------------------|
    `);
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

//function if user selects VIEW department option
function viewDepart() {
    db.query(`SELECT name, id FROM departments`, (err, rows) => {
        console.table(rows);
    });
    promptUser()
};

//function if user selects VIEW role option
function viewRole() {
    db.query(`SELECT * FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`, (err, rows) => {
        console.table(rows);
    });
    promptUser()
};

//function if user selects VIEW employees option
//need to add managers
function viewEmp() {
    db.query(`SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id`, (err, rows) => {
        console.table(rows);
    });
    promptUser()
};

//function if user selects ADD department option
function addDepart() {
    return inquirer.prompt([
        {
            type: "input",
            name: "newDepart",
            message: "Enter the DEPARTMENT NAME you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        db.query(`INSERT INTO departments VALUES (DEFAULT, ?)`,
            [answer.newDepart],
            function (err) {
                if (err) throw err;
                console.log(`
                ${answer.newDepart} has been added to Departments
                `)
                promptUser();
            }
        )
    })
};

//function if user selects ADD roles option
function addRole() {
    return inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "Enter the ROLE TITLE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "newRoleSalary",
            message: "Enter the SALARY for the ROLE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "newRoleDeptID",
            message: "Enter the DEPARTMENT ID associated with the ROLE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        }

    ]).then(function (answer) {
        db.query(`INSERT INTO roles SET ?`,
            {
                title: answer.newRole,
                salary: answer.newRoleSalary,
                department_id: answer.newRoleDeptID
            },
            function (err) {
                if (err) throw err;
                console.log(`
                ${answer.newRole} has been added to Roles
                `)
                promptUser();
            }
        )
    })
};

//function if user selects ADD employees option
function addEmp() {
    return inquirer.prompt([
        {
            type: "input",
            name: "newEmpFirstName",
            message: "Enter the FIRST NAME of the EMPLOYEE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmpLastName",
            message: "Enter the LAST NAME of the EMPLOYEE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "newEmpRoleID",
            message: "Enter the ROLE ID associated with the EMPLOYEE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "newEmpManagerID",
            message: "Enter the Manager ID associated with the EMPLOYEE you would like to add:",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a response");
                    return false;
                }
            }
        }

    ]).then(function (answer) {
        db.query(`INSERT INTO employees SET ?`,
            {
                first_name: answer.newEmpFirstName,
                last_name: answer.newEmpLastName,
                role_id: answer.newEmpRoleID,
                manager_id: answer.newEmpManagerID
            },
            function (err) {
                if (err) throw err;
                console.log(`
            ${answer.newRole} has been added to Roles
            `)
                promptUser();
            }
        )
    })
};

//function if user selects UPDATE employees option
function upEmp() {
    db.query(`SELECT * FROM employees`,
        function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "upEmpChoice",
                    choices: function () {
                        let upEmpChoiceArr = [];
                        for (i = 0; i < results.length; i++) {
                            upEmpChoiceArr.push(results[i].last_name);
                        }
                        return upEmpChoiceArr;
                    },
                    message: "Which EMPLOYEE would you like to update?"
                }
            ])
                .then(function (answer) {
                    const upEmpName = answer.choice;
                    db.query(`SELECT * from employees`,
                        function (err, results) {
                            if (err) throw err;
                            inquirer.prompt([
                                {
                                    type: "number",
                                    name: "upEmpRoleID",
                                    message: "Enter the UPDATED ROLE ID associated with the EMPLOYEE:",
                                    validate: titleInput => {
                                        if (titleInput) {
                                            return true;
                                        } else {
                                            console.log("Please enter a response");
                                            return false;
                                        }
                                    }
                                }
                            ]).then(function (answer) {
                                console.log(answer);
                                console.log(upEmpName);
                                db.query(`UPDATE employees SET ? WHERE last_name = ?`,
                                    [
                                        {
                                            role_id: answer.upEmpRoleID,
                                        }, upEmpName
                                    ],
                                ),
                                    console.log(`
                                Employee Updated
                                `);

                                promptUser()
                            });
                        })
                })

        })
}

//Function to initialize app
function init() {
    //start promptUser to get information about the Employee Tables
    promptUser()
};

//function call to initialize app
init();

//GET route that's not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});