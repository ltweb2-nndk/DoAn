var db = require('../utils/db');
var config = require('../config/default.json')

module.exports = {
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
    }, 
    getByAccID: id => {
        return db.load(`select * from editor e join account c join role r 
                on e.AccID = c.AccID and r.RoleID = c.RoleID 
				where e.AccID=${id}`)
    },
    count:()=>{
        return db.load('select count(*) as total from editor');
    },
    pageByEdi:(start_offset)=>{
        var limit=config.paginate.default;
        return db.load(`select * from editor limit ${limit} offset ${start_offset}`);
    },
}