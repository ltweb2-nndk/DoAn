var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    add: entity => {
        var params = {
            "RoleID": 1,
            "Username": entity.Username,
            "Password": entity.Password,
            "AccIsActive": 0,
            "AccCreatedOn": date.getDateTimeNow(),
            "VerifyID": entity.VerifyID
        }

        return db.add('account', params);
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
    singlebyUserName:(username)=>{
        return db.load(`select * from account where Username='${username}'`);
    },
    single:(id)=>{
        return db.load(`select * from account where AccID=${id}`);
    },
    insert:(entity)=>{
        entity.AccCreatedOn=date.getDateTimeNow();
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
};