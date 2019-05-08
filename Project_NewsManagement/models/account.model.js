var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    add: entity => {
        var params = {
            "RoleID": 1,
            "Username": entity.Username,
            "Password": entity.Password,
            "AccIsActive": 0,
            "AccCreatedOn": date.getDateTimeNow()
        }

        return db.add('account', params);
    },
    getByUsername: username => {
        return db.loadCount(`select * from account where Username = '${username}'`);
    },
    verify: id => {
        return db.load(`update account set AccIsActive = 1 where AccID = ${id}`);
    }
};