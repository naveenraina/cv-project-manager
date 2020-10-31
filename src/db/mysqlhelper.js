var mysql = require('mysql');
const mysqlconfig = require('@/db/mysqlconfig');
// Add the credentials to access your database
var connectionPool = mysql.createPool(mysqlconfig.default);

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
    if(task.status === 'Complete'){
        task.completedon = new Date();
    } else {
        task.completedon = null;
    }
    if(task.id === 0){
        let query = 'INSERT INTO `tasks`(taskname, description, userid, projectid, startedOn, tocompleteon, completedon, status, createdDate, estimateddays) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.tocompleteon, task.completedon, task.status, task.createdDate, task.estimateddays], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    } else {
        let query = 'update `tasks` set taskname=?, description=?, userid=?, projectid=?, startedOn=?, tocompleteon=?, completedon =?, status=?, updatedDate=?, estimateddays=? where id=? ';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.tocompleteon, task.completedon, task.status, new Date(), task.estimateddays, task.id], function(err, rows) {
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

function getTasks(filter, callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName, t.description, t.userId, u.user, t.projectId, p.projectName, t.startedOn, t.tocompleteon, t.completedOn, t.createdDate, t.updatedDate, t.status, t.estimateddays FROM tasks t left join users u on t.userid = u.id left join projects p on p.id = t.projectid where t.status in (?,?,?)';
    let inClause = [
        filter.showNew===true ? 'New' : '',
        filter.showInProgress===true ? 'InProgress' : '', 
        filter.showComplete===true ? 'Complete' : ''
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

function getTasksAssignedToUser(userId, callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName, t.status, t.startedon, t.tocompleteon, t.completedon, t.createddate from tasks t where t.userId = ?';
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
    gettodaysdailystatus(data.userId, (found)=>{
        if(found.length > 0){
            updatedailystatus(data, found[0].id, callback)
        } else {
            createdailystatus(data, callback)
        }
    })   
}

function createdailystatus(data, callback){
    // Perform a query
    let query = "INSERT INTO `dailystatus`(`didyesterday`, `willdotoday`, `anyroadblocks`, `createddate`, `UserId`, taskId) VALUES(?, ?, ?, ?, ?, ?)";
    
    connectionPool.query(query,[data.didyesterday, data.willdotoday, data.anyroadblocks, new Date(), data.userId, data.taskId], function(err) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback('success')
    });          
}

function updatedailystatus(data, id, callback){
    // Perform a query
    let query = "update `dailystatus` set `didyesterday`=?, `willdotoday`=?, `anyroadblocks`=?, `updateddate`=?, `UserId`=?, taskId=? where id=?";
    
    connectionPool.query(query,[data.didyesterday, data.willdotoday, data.anyroadblocks, new Date(), data.userId, data.taskId, id], function(err) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback('success')
    });          
}

function gettodaysdailystatus(userId, callback){
    let today = new Date().toISOString().slice(0, 10)
    let query = "select id, `didyesterday`, `willdotoday`, `anyroadblocks`, `createddate`, `UserId`, taskId from `dailystatus` where DATE(createddate) = ? and userId=?";
    
    connectionPool.query(query,[today, userId], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        } else {
            callback(rows)
        }
        
    });          
}

function getyesterdaysdailystatus(userId, callback){
    var date = new Date();
    date.setDate(date.getDate() - 1);
    let yesterday = date.toISOString().slice(0, 10)
    let query = "select id, `didyesterday`, `willdotoday`, `anyroadblocks`, `createddate`, `UserId`, taskId from `dailystatus` where DATE(createddate) = ? and userId=?";
    
    connectionPool.query(query,[yesterday, userId], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        } else {
            callback(rows)
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

function moveTask(data, callback){
    let query = 'update `tasks` set status=? where id=?';
    connectionPool.query(query, [data.status, data.id], function(err, rows) {
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
    saveTask, getTasks, getTasksAssignedToUser, deleteTask, moveTask,
    savedailystatus, saveproject, gettodaysdailystatus, getyesterdaysdailystatus,
    getProjects, editProject, deleteProject,
    getUsers
}
