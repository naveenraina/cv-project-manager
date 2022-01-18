const mysqlConnectionPool = require('@/db/mysqlConnectionPool');

let connectionPool = mysqlConnectionPool.default.createConnectionPool();


function getProjects(filter, callback){
    // Perform a query
    let query = 'SELECT id, projectname, projectstatus FROM `projects` where projectstatus in (?,?)';
     let inClause = [
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

function editProject(data, callback){ 
    let query = 'update `projects` set projectname=?, projectstatus=? where id=?';
    connectionPool.query(query, [data.name, data.status, data.id], function(err, rows) {
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
    let query = "INSERT INTO `projects`(`ProjectName`,`ProjectStatus`) VALUES(?, ?)";
    console.log(query)
    connectionPool.query(query,[data.name, data.status], function(err) {
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
