var mysql = require('mysql');
// Add the credentials to access your database
var connectionPool = mysql.createPool({
    host     : '182.50.133.92',
    port     : '3306',
    user     : 'cvtaskmanager',
    password : 'cvtaskmanager',
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


function saveTask(task, callback){
    if(task.id === 0){
        let query = 'INSERT INTO `tasks`(taskname, description, userid, projectid, startedOn, completedOn, status, createdDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.completedOn, task.status, task.createdDate], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    } else {
        let query = 'update `tasks` set taskname=?, description=?, userid=?, projectid=?, startedOn=?, completedOn=?, status=?, updatedDate=? where id=? ';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.completedOn, task.status, new Date(), task.id], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    }
}

function getTasks(callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName, t.description, t.userId, u.user, t.projectId, p.projectName, t.startedOn, t.completedOn, t.createdDate, t.updatedDate, t.status FROM tasks t left join users u on t.userid = u.id left join projects p on p.id = t.projectid';
    connectionPool.query(query, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
    });          
}

function getTasksAssignedToUser(userId, callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName from tasks t where t.userId = ?';
    connectionPool.query(query,[userId], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
    });
}

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
    let query = "INSERT INTO `dailystatus`(`didyesterday`, `willdotoday`, `anyroadblocks`, `createddate`, `UserId`, taskId) VALUES(?, ?, ?, ?, ?, ?)";
    console.log(query)
    connectionPool.query(query,[data.didyesterday, data.willdotoday, data.anyroadblocks, new Date(), data.userId, data.taskId], function(err) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback('success')
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

function deleteTask(data, callback){
    let query = 'delete from `tasks` where id=?';
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

export default {
    connect, endConnection, 
    login,
    saveTask, getTasks, getTasksAssignedToUser, deleteTask,  
    savedailystatus, saveproject, 
    getProjects, editProject, deleteProject,
    getUsers
}
