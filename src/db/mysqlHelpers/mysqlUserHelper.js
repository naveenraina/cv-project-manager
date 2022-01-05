const mysqlConnectionPool = require('@/db/mysqlConnectionPool'); 

let connectionPool = mysqlConnectionPool.default.createConnectionPool();
function saveUser(data, callback){
  let query = 'INSERT INTO `users` (user, password, status, role) VALUES(?, ?, ?, ?)';
    connectionPool.query(query, [data.userName, data.password, data.status, data.role], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            
            return;
        } else {
            callback(rows)
        }
    });
}

function editUser(data, callback) {
 let query ='update `users` set user=?,password=?,status=?,role=? where id=?';
    connectionPool.query(query, [data.name,data.password,data.status,data.role,data.id], function(err, rows){
        if(err){
           console.log("An error ocurred performing the query.")
            console.log(err);
             callback();
        return;
    }else {
        callback(rows)
     }
    });
}
function getUsers(filter,callback){
    let query = 'SELECT id, user, password, status, role FROM `users` where status in (?,?)';
    let inClause =[
        filter.showActive===true ? "Active" : "",
        filter.inActiveStatus===true ? "InActive" : ""
    ]
    connectionPool.query(query,inClause, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)         
    });          
}

function deleteUser(data, callback){
    let query = 'delete from `users` where id=?';
    connectionPool.query(query, [data.id], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        } else {
            callback('success')    
        }            
    });  
}

function login(username, password, callback){
    // Perform a query
    let query = "SELECT id, user, password, role FROM `users` where user=? and password=?";
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
    login, getUsers, deleteUser, saveUser , editUser
}
