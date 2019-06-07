var db = require('../utils/db');

module.exports = {
   all: () => {
      return db.load('select* from status');
   },
   
   single: (id) => {
      return db.load(`select * from status where StatusID=${id}`);
   },
   
   allWithNum: () => {
      return db.load('select s.*,count(a.StatusID) as num_of_art from status s left join  article a on s.StatusID=a.StatusID GROUP BY a.StatusID,s.StatusName,s.StatusID');
   },
}