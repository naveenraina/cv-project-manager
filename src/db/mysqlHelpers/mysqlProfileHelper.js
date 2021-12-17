const mysqlConnectionPool = require('@/db/mysqlConnectionPool');

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveProfile(data, callback){
    let query = "SELECT * FROM `basic-profile`  where UserID=?";
    console.log(query)

    connectionPool.query(query, data.userId, function (err, rows) {
        if (rows[0]) {
            let query = 'update `basic-profile` set FirstName=?, LastName=?, Dob=?, ContactNo=?, Email=?, Address=?, City =?, Country=? where UserID=? ';
            console.log(query)
            connectionPool.query(query, [data.fname, data.lname, data.dob, data.contact, data.email, data.address, data.city, data.country, data.userId], function(err,rows) {
                if(err){
                    console.log("An error ocurred performing the query.");
                    console.log(err);
                    return;
                }else {
                    callback(rows)
                }
            });
        } else {
            let query = "INSERT INTO `basic-profile`(`FirstName`,`LastName`,`Dob`,`ContactNo`,`Email`,`Address`,`City`,`Country`,`UserID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(query)
            connectionPool.query(query, [data.fname, data.lname, data.dob, data.contact, data.email, data.address, data.city, data.country, data.userId], function(err,rows) {
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

function getProfile(userId, callback) {
    let query = "SELECT * FROM `basic-profile` where UserID=?";
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
    saveProfile,getProfile
}
