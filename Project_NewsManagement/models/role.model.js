var db = require('../utils/db');

module.exports = {
    getByRoleID: id => {
        return db.load(`select * from role where RoleID = ${id}`);
    },
    all: () => {
        return db.load('select * from role');
    },
};