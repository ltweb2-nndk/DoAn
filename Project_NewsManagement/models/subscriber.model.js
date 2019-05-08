var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    add: entity => {
        var params = {
            "AccID": entity.AccID,
            "Fullname": entity.Fullname,
            "Email": entity.Username,
            "DOB": entity.DOB
        }

        return db.add('subscriber', params);
    }
};