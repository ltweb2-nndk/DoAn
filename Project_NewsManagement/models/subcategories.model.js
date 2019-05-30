var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from subcategories where SubCatIsActive = 1');
    },
    
    getByCatID: id => {
        return db.load(`select * from subcategories where CatID = ${id} and SubCatIsActive = 1`);
    },

    getBySubCatID: id => {
        return db.load(`select * from subcategories where SubCatID = ${id} and SubCatIsActive = 1`);
    }
};