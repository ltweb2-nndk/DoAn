var db = require('../utils/db');

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
    }

    // all: () => {
    //     return db.load('select * from subscriber');
    // },
    
    // single: (id) => {
    //     return db.load(`select * from subscriber where SubscriberID='${id}'`);
    // },

    // insert: (entity) => {
    //     entity.BoughtOn = date.getDateTimeNow();
    //     return db.add('subscriber', entity);
    // },

    // delete: id => {
    //     return db.delete('subscriber', 'SubscriberID', id);
    // },

    // updateDate1: (id) => {
    //     return db.load(`update subscriber set ExpiredOn=DATE_ADD(BoughtOn,INTERVAL 7 DAY) where SubscriberID=${id}`);
    // },

    // updateDate2: (id) => {
    //     return db.load(`update subscriber set ExpiredOn=DATE_ADD(NOW(),INTERVAL 7 DAY) where SubscriberID=${id}`);
    // },

    // search: (value) => {
    //     return db.load(`select * from subscriber where FullName like N'%${value}%'`);
    // }
};