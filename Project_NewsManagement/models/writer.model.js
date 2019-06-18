var db = require('../utils/db');
var date = require('../public/js/custom');
var config = require('../config/default.json')

module.exports = {
    getByAccID: id => {
        return db.load(`select * from writer s join account c join role r 
        on s.AccID = ${id} and s.AccID = c.AccID and r.RoleID = c.RoleID`);
    },

    update: (id, entity) => {
        return db.update('writer', 'WriterID', entity, id);
    },

    all: () => {
        return db.load('select * from writer');
    },
    single: (id) => {
        return db.load(`select * from writer where WriterID=${id}`);
    },
    singlebyname: (FullName) => {
        return db.load(`select * from writer where FullName='${FullName}'`);
    },
    insert: (entity) => {
        return db.add('writer', entity);
    },
    delete: id => {
        return db.delete('writer', 'WriterID', id);
    },
    search: (value) => {
        return db.load(`select * from writer where FullName like N'%${value}%' `);
    },
    count:()=>{
        return db.load('select count(*) as total from writer');
    },
    pageByWrt:(start_offset)=>{
        var limit=config.paginate.default;
        return db.load(`select * from writer limit ${limit} offset ${start_offset}`);
    },
};