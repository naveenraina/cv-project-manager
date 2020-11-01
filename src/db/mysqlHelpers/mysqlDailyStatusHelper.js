const mysqlConnectionPool = require('@/db/mysqlConnectionPool'); 

let connectionPool = mysqlConnectionPool.default.createConnectionPool();


function savedailystatus(data, callback){
    gettodaysdailystatus(data.userId, (found)=>{
        if(found.length > 0){
            updatedailystatus(data, found[0].id, () => {
                moveTask({id: data.taskId, status: "InProgress"}, callback)
            })
        } else {
            createdailystatus(data, () => {
                moveTask({id: data.taskId, status: "InProgress"}, callback)
            })
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

export default {
    savedailystatus, gettodaysdailystatus, getyesterdaysdailystatus
}
