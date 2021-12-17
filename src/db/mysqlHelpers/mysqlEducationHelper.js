const mysqlConnectionPool = require('@/db/mysqlConnectionPool');

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveEducation(data, callback){
    let query = "SELECT * FROM `education-profile`  where UserID=?";
    console.log(query)

    connectionPool.query(query, data.userId, function (err, rows) {
        if (rows[0]) {
            let query = 'update `education-profile` set Qualification=?, CourseName=?, CourseSpcl=?, UniversityName=?, PassingYear=?, Percantage=?, TechnicalSkills =?, Certificate=? where UserID=? ';
            console.log(query)
            connectionPool.query(query, [data.hqualification, data.cname, data.cspcl, data.institute, data.pyear, data.marks, data.skills, data.certificate,  data.userId], function(err,rows) {
                if(err){
                    console.log("An error ocurred performing the query.");
                    console.log(err);
                    return;
                }else {
                    callback(rows)
                }
            });
        } else {
            let query = "INSERT INTO `education-profile`(`Qualification`,`CourseName`,`CourseSpcl`,`UniversityName`,`PassingYear`,`Percantage`,`TechnicalSkills`,`Certificate`,`UserID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(query)
            connectionPool.query(query, [data.hqualification, data.cname, data.cspcl, data.institute, data.pyear, data.marks, data.skills, data.certificate,  data.userId], function(err,rows) {
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


function getEducation(userId, callback) {
    let query = "SELECT * FROM `education-profile` where UserID=?";
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
    saveEducation, getEducation
}
