var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from subcategories');
    },
    allByCatID: id => {
        return db.load(`select * from subcategories where CatID = ${id}`);
    },
    single:(id)=>{
        return db.load(`select * from subcategories where SubCatID=${id}`);
     },
     singles:(id)=>{
    return db.load(`select * from subcategories where CatID=${id}`);
     },
     insert:(entity)=>{
         return db.add('subcategories',entity);
     },
     update:entity=>{
         var id=entity.SubCatID;
         delete entity.SubCatID;
         return db.update('subcategories','SubCatID',entity,id);
     },
     delete: id => {
         return db.delete('subcategories', 'SubCatID', id);
     },
};