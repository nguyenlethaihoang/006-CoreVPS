const { Sequelize } = require('sequelize');

const connection = {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    databaseName: process.env.DATABASE_NAME,
    user: process.env.USER
}
require('dotenv').config()
console.log(process.env.DIALECT)

const sequelize = new Sequelize('corebanking', 'admin_db', 'dbpassword@1', {
    host: 'core-banking-db.mysql.database.azure.com',
    dialect: 'mysql',
    define:{
      freezeTableName: true
    },
    ssl: 'ca:fs.readFileSync("{ca-cert filename}")'
  });

// const sequelize = new Sequelize('corebanking', 'root', null , {
//     host: 'localhost',
//     dialect: 'mysql',
//     define:{
//       freezeTableName: true
//     }
// });

module.exports = sequelize

//var conn=mysql.createConnection({host:"core-banking-db.mysql.database.azure.com", user:"admin_db", password:"{Camhackpass@44}", database:"{corebanking}", port:3306, ssl:{ca:fs.readFileSync("{ca-cert filename}")}});