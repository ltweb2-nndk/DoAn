var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    add: entity => {
        var params = {
            "AccID": entity.AccID,
            "SubscriberName": entity.Fullname,
            "DOB": entity.DOB
        }

        return db.add('subscriber', params);
    },

    getByAccID: id => {
        return db.load(`select * from subscriber s join account c where s.AccID = ${id} and s.AccID = c.AccID`);
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
    insert:(entity)=>{
        entity.BoughtOn=date.getDateTimeNow();
        return db.add('subscriber',entity);
    },
    update:(entity)=>{
        var id=entity.SubscriberID;
        delete entity.SubscriberID;
        return db.update('subscriber','SubscriberID',entity,id);
    },
    delete: id => {
        return db.delete('subscriber', 'SubscriberID', id);
     },
    updateDate1:(id)=>{
    return db.load(`update subscriber set ExpiredOn=DATE_ADD(BoughtOn,INTERVAL 7 DAY) where SubscriberID=${id}`);
    },
    updateDate2:(id)=>{
        return db.load(`update subscriber set ExpiredOn=DATE_ADD(NOW(),INTERVAL 7 DAY) where SubscriberID=${id}`);
    },
    search:(value)=>{
        return db.load(`select * from subscriber where FullName like N'%${value}%'`);
    }
};