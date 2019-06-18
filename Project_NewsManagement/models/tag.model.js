var db = require('../utils/db');
var config = require('../config/default.json');
module.exports = {
    all: () => {
        return db.load('select * from tag');
    },
    
    single: (id) => {
        return db.load(`select * from tag where TagID=${id}`);
    },

    singlebyname: (TagName) => {
        return db.load(`select * from tag where TagName='${TagName}'`);
    },

    insert: (entity) => {
        return db.add('tag', entity);
    },
    
    update: entity => {
        var id = entity.TagID;
        delete entity.TagID;
        return db.update('tag', 'TagID', entity, id);
    },

    delete: id => {
        return db.delete('tag', 'TagID', id);
    },

    search: (value) => {
        return db.load(`select * from tag tg where tg.TagID like '${value}' or tg.TagName like N'%${value}%'`);
    },

    count: () => {
        return db.load('select count(*) as total from tag');
    },

    pageByTag: (start_offset) => {
        var limit = config.paginate.default;
        return db.load(`select * from tag limit ${limit} offset ${start_offset}`);
    },
    countByKeyword:(keyword)=>{
        return db.load(`select count(*) as total from tag tg where tg.TagID like '${keyword}' or tg.TagName like N'%${keyword}%'`);
    },
    pageByKeyword:(keyword,start_offset)=>{
        var limit = config.paginate.default;
        return db.load(`select * from tag tg where tg.TagID like '${keyword}' or tg.TagName like N'%${keyword}%' limit ${limit} offset ${start_offset}`);
    },
    add: (tagname) => {
        var entity = {
            "TagName": tagname
        };

        return db.add('tag', entity);
    }
};