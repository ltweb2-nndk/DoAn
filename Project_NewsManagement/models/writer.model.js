var db = require('../utils/db');

module.exports = {
    getByAccID: id => {
        return db.load(`select * from writer w join account c join role r where w.AccID = ${id} and w.AccID = c.AccID and c.RoleID = r.RoleID`);
    }
};