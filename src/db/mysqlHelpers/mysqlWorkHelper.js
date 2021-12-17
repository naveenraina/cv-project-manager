const mysqlConnectionPool = require('@/db/mysqlConnectionPool');

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveWork(data, callback){
    let query = "SELECT * FROM `work-profile` where UserID=?";
    console.log(query)

    connectionPool.query(query, data.userId, function (err, rows) {
        if (rows[0]) {
            let query = 'update `work-profile` set EmployeeID=?, EmployeeName=?, EmployeeTitle=?, Department=?, ContactNo=?, EmailID=?, SkypeeID =?, UpworkID=? where UserID=? ';
            console.log(query)
            connectionPool.query(query, [data.eid, data.ename, data.title, data.department, data.contact, data.email, data.skype, data.upwork, data.userId ], function(err,rows) {
                if(err){
                    console.log("An error ocurred performing the query.");
                    console.log(err);
                    return;
                }else {
                    callback(rows)
                }
            });
        } else {
            let query = "INSERT INTO `work-profile`(`EmployeeID`,`EmployeeName`,`EmployeeTitle`,`Department`,`ContactNo`,`EmailID`,`SkypeeID`,`UpworkID`,`UserID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(query)
            connectionPool.query(query, [data.eid, data.ename, data.title, data.department, data.contact, data.email, data.skype, data.upwork, data.userId ], function(err,rows) {
                if(err){
                    console.log("An error ocurred performing the query.");
                    console.log(err);
                    return;
                }else {
                    callback(rows)
                }
            });
        }
    });




    // Perform a query

}

function getWork(userId, callback) {
    console.log("Profile Mysql");
    let query = "SELECT * FROM `work-profile` where UserID=?";
    console.log(query)
    connectionPool.query(query, userId, function(err, rows) {
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
        saveWork, getWork
}
