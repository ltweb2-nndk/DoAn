var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    all:()=>{
        return db.load('select * from subscriber');
    },
    single:(id)=>{
        return db.load(`select * from subscriber where SubscriberID='${id}'`);
    },
    update:(entity)=>{
        var id=entity.SubscriberID;
        delete entity.SubscriberID;
        return db.update('subscriber','SubscriberID',entity,id);
    },
    delete: id => {
        return db.delete('subscriber', 'SubscriberID', id);
     }, 
    search:(value)=>{
        return db.load(`select * from subscriber where FullName like N'%${value}%'`);
    }
};