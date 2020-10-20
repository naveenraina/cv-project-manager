var mysql = require('mysql');
// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : '182.50.133.92',
    port     : '3306',
    user     : 'cvtaskmanager',
    password : 'cvtaskmanager1!',
    database : 'cvtaskmanager'
});


function connect(){
    
    // connect to mysql
    connection.connect(function(err) {
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

    connection.query(query, ['TEST DESC', getdate()], function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        console.log("Query succesfully executed", rows);
    });
}

function getTasks(){    
    // Perform a query
    let query = 'SELECT ID, DESCRIPTION, CREATEDDATE FROM `tasks`';

    connection.query(query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        console.log("Query succesfully executed", rows);
        
    });
}

function endConnection(callback){
    // Close the connection
    connection.end(function(){
        if(!!callback) { callback() };
    });
}

export default {
    connect, saveTask, getTasks, endConnection
}
