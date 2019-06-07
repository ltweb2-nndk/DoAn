var db = require('../utils/db');

module.exports = {
    add: entity => {
        return db.add('account', entity);
    },

    getByUsername: username => {
        return db.load(`select * from account where Username = '${username}'`);
    },

    checkLogin: (username, password) => {
        return db.load(`select * from account where Username = '${username}' and Password = '${password}'`);
    },

    update: (id, entity) => {
        return db.update('account', 'AccID', entity, id);
    },

    // singlebyUserName: (username) => {
    //     return db.load(`select * from account where Username='${username}'`);
    // },

    // single: (id) => {
    //     return db.load(`select * from account where AccID=${id}`);
    // },

    // insert: (entity) => {
    //     entity.AccCreatedOn = date.getDateTimeNow();
    //     return db.add('account', entity);
    // },

    // update: entity => {
    //     var id = entity.AccID;
    //     delete entity.AccID;
    //     return db.update('account', 'AccID', entity, id);
    // },

    // delete: (id) => {
    //     return db.delete('account', 'AccID', id);
    // }
};