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
    }
};