const mysqlConnectionPool = require('@/db/mysqlConnectionPool'); 

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function getProjects(callback){
    // Perform a query
    let query = 'SELECT id, projectname FROM `projects`';
    connectionPool.query(query, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
    });          
}

function editProject(data, callback){
    let query = 'update `projects` set projectname=? where id=?';
    connectionPool.query(query, [data.name, data.id], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        } else {
            callback('success')    
        }            
    });  
}

function deleteProject(data, callback){
    let query = 'delete from `projects` where id=?';
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

function saveproject(data, callback){
    // Perform a query
    let query = "INSERT INTO `projects`(`ProjectName`) VALUES(?)";
    console.log(query)
    connectionPool.query(query,[data.name], function(err) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback('success')
    });
}


export default {
    saveproject, getProjects, editProject, deleteProject
}
