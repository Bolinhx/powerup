// config/db.js
require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    options: {
      encrypt: true,
      enableArithAbort: true
    },
    port: 1433,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado ao SQL Server');
    return pool;
  })
  .catch(err => console.log('Falha ao conectar ao SQL Server:', err));

module.exports = {
  sql, poolPromise
};