var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports = {
    getByAccID: id => {
        return db.load(`select * from writer s join account c where s.AccID = ${id} and s.AccID = c.AccID`);
    },
    all:()=>{
        return db.load('select * from writer');
    },
    single:(id)=>{
        return db.load(`select * from writer where WriterID=${id}`);
    },
    singlebyname:(FullName)=>{
        return db.load(`select * from writer where FullName='${FullName}'`);
    },
    insert:(entity)=>{
        return db.add('writer',entity);
    },
    update:entity=>{
        var id=entity.WriterID;
        delete entity.WriterID;
        return db.update('writer','WriterID',entity,id);
    },
    delete: id => {
        return db.delete('writer', 'WriterID', id);
    },
    search:(value)=>{
        return db.load(`select * from writer where FullName like N'%${value}%' `);
    }
};