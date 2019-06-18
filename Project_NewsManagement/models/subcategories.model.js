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
    },

    allByCatID: id => {
        return db.load(`select * from subcategories where CatID = ${id}`);
    },

    single: (id) => {
        return db.load(`select * from subcategories where SubCatID=${id}`);
    },

    singles: (id) => {
        return db.load(`select * from subcategories where CatID=${id}`);
    },

    singlebyname: (SubCatName) => {
        return db.load(`select * from subcategories where SubCatName='${SubCatName}'`);
    },

    insert: (entity) => {
        return db.add('subcategories', entity);
    },

    update: entity => {
        var id = entity.SubCatID;
        delete entity.SubCatID;
        return db.update('subcategories', 'SubCatID', entity, id);
    },
    
    delete: id => {
        return db.delete('subcategories', 'SubCatID', id);
    }
};