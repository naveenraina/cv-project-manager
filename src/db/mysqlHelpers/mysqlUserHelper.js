const mysqlConnectionPool = require('@/db/mysqlConnectionPool'); 

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function getUsers(callback){
    // Perform a query
    let query = 'SELECT id, user FROM `users`';
    connectionPool.query(query, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
    });          
}

function login(username, password, callback){
    // Perform a query
    let query = "SELECT id, user, password FROM `users` where user=? and password=?";
    connectionPool.query(query,[username, password], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        if(rows.length > 0){
            callback(rows[0])
        } else {
            callback('error')
        } 
    });          
}

export default {    
    login, getUsers
}
