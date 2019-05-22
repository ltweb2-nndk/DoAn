var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select* from rank');
    },single:(id)=>{
        return db.load(`select * from rank where RankID=${id}`);
    }
};