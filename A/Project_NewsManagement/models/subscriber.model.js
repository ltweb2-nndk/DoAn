var db = require('../utils/db');
var config = require('../config/default.json')

module.exports = {
    add: entity => {
        return db.add('subscriber', entity);
    },

    getByAccID: id => {
        return db.load(`select * from subscriber s join account c where s.AccID = ${id} and s.AccID = c.AccID`);
    },

    getByUsername: username => {
        return db.load(`select * from subscriber s join account c where c.Username = '${username}' and s.AccID = c.AccID`);
    },

    update: (id, entity) => {
        return db.update('subscriber', 'SubscriberID', entity, id);
    },
    all:()=>{
        return db.load('select * from subscriber');
    },
    single:(id)=>{
        return db.load(`select * from subscriber where SubscriberID='${id}'`);
    },
    delete: id => {
        return db.delete('subscriber', 'SubscriberID', id);
     }, 
    search:(value)=>{
        return db.load(`select * from subscriber where FullName like N'%${value}%'`);
    },
    count:()=>{
        return db.load('select count(*) as total from subscriber');
    },
    pageBySub:(start_offset)=>{
        var limit=config.paginate.default;
        return db.load(`select * from subscriber limit ${limit} offset ${start_offset}`);
    },
};