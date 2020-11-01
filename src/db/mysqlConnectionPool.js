let mysql = require('mysql');
const mysqlconfig = require('@/db/mysqlconfig');
let connectionPool;

function createConnectionPool() {
  if(connectionPool){
    return connectionPool;
  } else {
    connectionPool = mysql.createPool(mysqlconfig.default);
    return connectionPool;
  }  
} 

export default {
  createConnectionPool
}