var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports={
    getByAccID: id => {
        return db.load(`select * from writer s join account c where s.AccID = ${id} and s.AccID = c.AccID`);
    },
    single:(id)=>{
        return db.load(`select * from writer where WriterID=${id}`);
    },
};