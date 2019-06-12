var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    insert:(entity)=>{
        return db.add('account',entity);
    },
    update:entity=>{
        var id=entity.AccID;
        delete entity.AccID;
        return db.update('account','AccID',entity,id);
    },
    delete:(id)=>{
        return db.delete('account', 'AccID', id);
    },
    single:(id)=>{
        return db.load(`select * from account where AccID=${id}`);
    },
    singleByUserName:(username)=>{
        return db.load(`select * from account where Username='${username}'`);
    },
};