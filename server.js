const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
const mySQLlogin = require('./password.js');

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        user: mySQLlogin.mysql.user,
        password: mySQLlogin.mysql.password,
        database: mySQLlogin.mysql.database,
    },
    console.log('Connected to the election database.')
);