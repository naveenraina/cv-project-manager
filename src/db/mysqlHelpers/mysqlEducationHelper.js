const mysqlConnectionPool = require("@/db/mysqlConnectionPool");

let connectionPool = mysqlConnectionPool.default.createConnectionPool();

function saveEducation(data, callback) {
  data.forEach((element) => {
    if (element.ID != "") {
      let query =
        "update `education-profile` set Qualification=?, CourseName=?, CourseSpcl=?, UniversityName=?, PassingYear=?, Percantage=?, TechnicalSkills =?, Certificate=? where UserID=? AND ID=?";
      connectionPool.query(
        query,
        [
          element.Qualification,
          element.CourseName,
          element.CourseSpcl,
          element.UniversityName,
          element.PassingYear,
          element.Percantage,
          element.TechnicalSkills,
          element.Certificate,
          element.UserId,
          element.ID,
        ],
        function(err, rows) {
          if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
          } else {
            callback(rows);
          }
        }
      );
    } else {
      let query =
        "INSERT INTO `education-profile`(`Qualification`,`CourseName`,`CourseSpcl`,`UniversityName`,`PassingYear`,`Percantage`,`TechnicalSkills`,`Certificate`,`UserID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
      connectionPool.query(
        query,
        [
          element.Qualification,
          element.CourseName,
          element.CourseSpcl,
          element.UniversityName,
          element.PassingYear,
          element.Percantage,
          element.TechnicalSkills,
          element.Certificate,
          element.UserId,
        ],
        function(err, rows) {
          if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
          } else {
            callback(rows);
          }
        }
      );
    }
  });
}

function getEducation(userId, callback) {
  let query = "SELECT * FROM `education-profile` where UserID=?";
  connectionPool.query(query, userId, function(err, rows) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    } else {
      callback(rows);
    }
  });
}
function deleteEducation(data, callback){
  let query = 'delete from `education-profile` where id=?';
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
  saveEducation,
  getEducation,
  deleteEducation,
};
