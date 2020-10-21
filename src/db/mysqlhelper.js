var mysql = require('mysql');
// Add the credentials to access your database
var connectionPool = mysql.createPool({
    host     : '182.50.133.92',
    port     : '3306',
    user     : 'cvtaskmanager',
    password : 'cvtaskmanager1!',
    database : 'cvtaskmanager'
});


function connect(){
    
    // connect to mysql
    connectionPool.connect(function(err) {
        // in case of error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }
    });
}

function saveTask(){
    // Perform a query
    let query = 'INSERT INTO `tasks`(Description, CreatedDate) VALUES(?, ?)';

    connectionPool.query(query, ['TEST DESC', getdate()], function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        console.log("Query succesfully executed", rows);
    });
}

function getTasks(callback){ 
   
    // Perform a query
    let query = 'SELECT ID, DESCRIPTION, CREATEDDATE FROM `tasks`';

    connectionPool.query(query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        callback(rows)
        
    });
          
}

function endConnection(callback){
    // Close the connection
    connectionPool.end(function(){
        if(!!callback) { callback() };
    });
}

export default {
    connect, saveTask, getTasks, endConnection
}