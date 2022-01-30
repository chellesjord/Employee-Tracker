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
        database: mySQLlogin.mysql.database,
    },
    console.log('Connected to the employeetracker database.')
);


// //GET route connected to http://localhost:3001
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

//GET a single candidate
db.query(`SELECT * FROM employee WHERE id=1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

//GET route that's not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});