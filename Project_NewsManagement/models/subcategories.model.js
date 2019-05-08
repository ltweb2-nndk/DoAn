var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from subcategories');
    },
    allByCatID: id => {
        return db.load(`select * from subcategories where CatID = ${id}`);
    }
};