var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from category where CatIsActive = 1');
    },

    getByCatID: id => {
        return db.load(`select * from category where CatID = ${id} and CatIsActive = 1`);
    }
};