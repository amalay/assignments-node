'use strict';
const mysql = require('mysql2');
const env = require('dotenv').config();
const dbConn = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_ROOT_USER, password: process.env.MYSQL_ROOT_PASSWORD, multipleStatements: true });

dbConn.connect(function(err) {
    if (err){
        throw err;
    } 
    
    console.log("Mysql database connected successfully!");

    var sqlScript = `
    CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}; 
    
    USE ${process.env.MYSQL_DATABASE};

    CREATE TABLE IF NOT EXISTS person 
    (
        Id INT PRIMARY KEY AUTO_INCREMENT,
        FirstName VARCHAR(25) NOT NULL,
        LastName VARCHAR(25) NOT NULL
    )

    `;

    dbConn.query(sqlScript, (err, result) => {
        if(err) {                    
            throw err;
        }

        console.log(`MySql script executed successfully!`);        
    });
});
