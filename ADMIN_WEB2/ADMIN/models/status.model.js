var db = require('../utils/db');

module.exports = {
    all:()=>{
        return db.load('select* from status');
     },
     single:(id)=>{
        return db.load(`select * from status where StatusID=${id}`);
     }
}