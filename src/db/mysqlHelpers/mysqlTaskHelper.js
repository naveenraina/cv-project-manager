const mysqlConnectionPool = require('@/db/mysqlConnectionPool'); 

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveTask(task, callback){
    if(task.status === 'Complete'){
        task.completedon = new Date();
    } else {
        task.completedon = null;
    }
    if(task.id === 0){
        let query = 'INSERT INTO `tasks`(taskname, description, userid, projectid, startedOn, tocompleteon, completedon, status, createdDate, estimateddays, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.tocompleteon, task.completedon, task.status, task.createdDate, task.estimateddays, task.priority], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    } else {
        let query = 'update `tasks` set taskname=?, description=?, userid=?, projectid=?, startedOn=?, tocompleteon=?, completedon =?, status=?, updatedDate=?, estimateddays=?, priority=? where id=? ';
        connectionPool.query(query, [task.taskName, task.description, task.userId, task.projectId, task.startedOn, task.tocompleteon, task.completedon, task.status, new Date(), task.estimateddays, task.priority, task.id], function(err, rows) {
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
    let query = 'SELECT t.id, t.taskName, t.description, t.userId, u.user, t.projectId, p.projectName, t.startedOn, t.tocompleteon, t.completedOn, t.createdDate, t.updatedDate, t.status, t.estimateddays, t.priority FROM tasks t left join users u on t.userid = u.id left join projects p on p.id = t.projectid where t.status in (?,?,?)  order by t.priority desc';
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

function getTaskById(taskId, callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName, t.description, t.status, t.startedon, t.tocompleteon, t.completedon, t.createddate, t.priority from tasks t where t.id = ?';
    connectionPool.query(query,[taskId], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        if(rows.length === 1){
            callback(rows[0]) 
        }               
    });
}

function getTasksAssignedToUser(userId, callback){
    // Perform a query
    let query = 'SELECT t.id, t.taskName, t.description, t.userId, u.user, t.projectId, p.projectName, t.startedOn, t.tocompleteon, t.completedOn, t.createdDate, t.updatedDate, t.status, t.estimateddays, t.priority, t.previousId FROM tasks t left join users u on t.userid = u.id left join projects p on p.id = t.projectid where t.userId = ? order by t.priority desc';
    connectionPool.query(query,[userId], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
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
    let query = 'update `tasks` set status=?, startedon=?, completedon=? where id=?';
    let params = []

    getTaskById(data.id, (task) => {        
        if(task.status === "New" && data.status === "InProgress" ) {
            params = [data.status, new Date(), null, data.id]
        } else  if(task.status === "Complete" && data.status === "InProgress" ) {
            params = [data.status, task.startedon, null, data.id]
        } else if(task.status === "New" && data.status === "Complete") {
            params = [data.status, null, new Date(), data.id]
        } else if(task.status === "InProgress" && data.status === "Complete") {
            params = [data.status, task.startedon, new Date(), data.id]
        } else if(data.status === "New") {
            params = [data.status, null, null, data.id]
        }

        if(task.status === data.status){ // just return. no need to update status
            callback('success');
            return;   
        }

        connectionPool.query(query, params, function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback('success')    
            }            
        });  
    })
}

function getNotes(taskid, callback){
    // Perform a query
    let query = 'SELECT n.id, n.description, n.createddate, n.taskid, n.userid, u.user from notes n left join users u on n.userid = u.id where n.taskid = ? order by n.createddate desc';
     
    connectionPool.query(query, taskid, function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        callback(rows)        
    });          
}

function saveNote(note, callback){    
    if(note.id === 0){
        let query = 'INSERT INTO notes(description, createddate, userid, taskid  ) VALUES(?, ?, ?, ?)';
        connectionPool.query(query, [note.description, note.createddate, note.userid, note.taskid ], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    } else {
        let query = 'update notes set description=?, createddate=?, userid=?, taskid=? where id=? ';
        connectionPool.query(query, [note.description, note.createddate, note.userid, note.taskid, note.id], function(err, rows) {
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

function deleteNote(id, callback){
    let query = 'delete from notes where id=?';
    connectionPool.query(query, [id], function(err, rows) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        } else {
            callback('success')    
        }            
    });  
}

function saveSequence(data, callback){ 
    data.forEach(element => {
        let query = 'update `tasks` set PreviousId=? where ID=?';
        connectionPool.query(query, [element.previousId, element.taskId ], function(err, rows) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            } else {
                callback(rows)
            }
        });
    });
    
}

export default {    
    saveTask, getTasks, getTasksAssignedToUser, deleteTask, moveTask,
    getNotes, saveNote, deleteNote,
    saveSequence
}
