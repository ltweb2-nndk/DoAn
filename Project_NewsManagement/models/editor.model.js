var db = require('../utils/db');
module.exports = {
    all: () => {
        return db.load('select * from editor');
    },

    single: (id) => {
        return db.load(`select * from editor where EditorID= '${id}'`);
    },

    insert: (entity) => {
        return db.add('editor', entity);
    },
    
    update: (entity) => {
        var id = entity.EditorID;
        delete entity.EditorID;
        return db.update('editor', 'EditorID', entity, id);
    },

    delete: id => {
        return db.delete('editor', 'EditorID', id);
    },

    search: (value) => {
        return db.load(`select * from editor where FullName like N'%${value}%'`);
    },
    
    getByAccID: id => {
        return db.load(`select * from editor s join account c join role r 
        on s.AccID = ${id} and s.AccID = c.AccID and r.RoleID = c.RoleID`)
    }
}