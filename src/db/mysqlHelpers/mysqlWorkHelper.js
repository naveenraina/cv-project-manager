const mysqlConnectionPool = require('@/db/mysqlConnectionPool');

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveWork(data, callback){
     data.forEach((element) => {
          if(element.ID != ""){
              let query = "update `work-profile` set EmployeeID=?, EmployeeName=?, EmployeeTitle=?, Department=?, ContactNo=?, EmailID=?, SkypeeID =?, UpworkID=? where UserID=? "
         
       connectionPool.query(
           query,
          [
             element.EmployeeID,element.EmployeeName, element.EmployeeTitle, element.Department, element.ContactNo, element.EmailID, element.SkypeeID, element.UpworkID, element.userId    
           ],

           function(err, rows){
               if(err){
                   console.log("An error ocurred performing the query.");
                   console.log(err);
                     return;
               } else{
                   callback(rows)
               }

           }
       );
     } else{
         let query = "INSERT INTO `work-profile`(`EmployeeID`,`EmployeeName`,`EmployeeTitle`,`Department`,`ContactNo`,`EmailID`,`SkypeeID`,`UpworkID`,`UserID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
         connectionPool.query(query, [element.EmployeeID, element.EmployeeName, element.EmployeeTitle, element.Department, element.ContactNo, element.EmailID, element.SkypeeID, element.UpworkID, element.userId ],
             function(err, rows) {
                 if (err) {
                   console.log("An error ocurred performing the query.");
                   console.log(err);
                   return;
             } else {
                   callback(rows);
                 }
               }
          ) }

      })
   

    // Perform a query

}
function getWork(userId, callback) {
    let query = "SELECT * FROM `work-profile` where UserID=?";
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

 function deleteWork(data, callback){
     let query = 'delete from `work-profile` where id=?';
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
        saveWork,deleteWork,getWork
}
