var db = require('../utils/db');
var config = require('../config/default.json');

module.exports = {
    all: () => {
        return db.load('select * from category where CatIsActive = 1');
    },

    getByCatID: id => {
        return db.load(`select * from category where CatID = ${id} and CatIsActive = 1`);
    },

    single: (id) => {
        return db.load(`select * from category where CatID = ${id}`);
    },

    singlebyCatName: (catname) => {
        return db.load(`select * from category where CatName = '${catname}'`);
    },

    insert: (entity) => {
        return db.add('category', entity);
    },

    update: entity => {
        var id = entity.CatID;
        delete entity.CatID;
        return db.update('category', 'CatID', entity, id);
    },

    delete: id => {
        return db.delete('category', 'CatID', id);
    },

    search: (value) => {
        return db.load(`select * from category ct where ct.CatID like '${value}' or ct.CatName like N'%${value}%'`);
    },

    count: () => {
        return db.load('select count(*) as total from category');
    },

    pageByCat: (start_offset) => {
        var limit = config.paginate.default;
        return db.load(`select * from category limit ${limit} offset ${start_offset}`);
    },

    allwithNum: () => {
        return db.load('select c.*, count(a.StatusID) as num_of_art from category c left join article a on c.CatID=a.CatID GROUP BY c.CatName,c.CatID,c.EditorID,c.CatIsActive');
    },

    getByID: (editID) => {
        return db.load(`select c.*,a.StatusID,count(a.CatID) as num_of_art from category c join article a on c.CatID = a.CatID
        where c.EditorID = ${editID} and a.StatusID = 1
        GROUP BY c.CatName,c.CatID,c.EditorID,c.CatIsActive,a.StatusID`);
    }
};