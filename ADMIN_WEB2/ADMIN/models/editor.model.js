var db = require('../utils/db');
module.exports={
    all:()=>{
        return db.load('select * from editor');
    },
    single:(id)=>{
        return db.load(`select * from editor where EditorID= '${id}'`);
    },
    singlebyname:(FullName)=>{
        return db.load(`select * from editor where FullName='${FullName}'`);
    },
    insert:(entity)=>{
        return db.add('editor',entity);
    },
    update:(entity)=>{
        var id=entity.EditorID;
        delete entity.EditorID;
        return db.update('editor','EditorID',entity,id);
    },
    delete: id => {
        return db.delete('editor', 'EditorID', id);
    },
    search:(value)=>{
        return db.load(`select * from editor where FullName like N'%${value}%'`);
    }
}