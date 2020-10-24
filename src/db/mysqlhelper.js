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

function endConnection(callback){
    // Close the connection
    connectionPool.end(function(){
        if(callback) { callback() }
    });
}


function saveTask(){
    // Perform a query
    let query = 'INSERT INTO `tasks`(Description, CreatedDate) VALUES(?, ?)';

    connectionPool.query(query, ['TEST DESC', new Date()], function(err, rows) {
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
    let query = 'SELECT id, taskname, description, CREATEDDATE FROM `tasks`';

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
    console.log(query)
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

function savedailystatus(data, callback){
    // Perform a query
    let query = "INSERT INTO `dailystatus`(`didyesterday`, `willdotoday`, `anyroadblocks`, `createddate`, `UserId`) VALUES(?, ?, ?, ?, ?)";
    console.log(query)
    connectionPool.query(query,[data.didyesterday, data.willdotoday, data.anyroadblocks, new Date(), data.userId], function(err) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback('success')
    });          
}


export default {
    connect, endConnection, saveTask, getTasks, login, savedailystatus
}
