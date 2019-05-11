var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    add: entity => {
        var params = {
            "AccID": entity.AccID,
            "SubscriberName": entity.Fullname,
            "Avatar": "/img/user/default-avatar.jpg",
            "DOB": new Date(entity.Year, entity.Month - 1, entity. Day)
        }

        return db.add('subscriber', params);
    },

    getByAccID: id => {
        return db.load(`select * from subscriber s join account c where s.AccID = ${id} and s.AccID = c.AccID`);
    }
};