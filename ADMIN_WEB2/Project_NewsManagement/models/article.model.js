var db = require('../utils/db');
var date = require('../public/js/custom');
var config=require('../config/default.json');
module.exports = {
    all:()=>{
        return db.load('select * from article');
    },
    update: entity=>{
        var id = entity.ArtID;
        delete entity.TagID;
        return db.update('article','ArtID',entity,id);
    },
   
    single:(id)=>{
        return db.load(`select * from article ar where ArtID=${id}`)
    },
    delete: id => {
        return db.delete('article', 'ArtID', id);
    },
    search:(value)=>{
        return db.load(`select * from article ar where ar.ArtID like '${value}' or ar.ArtTitle like N'%${value}%'`);
    },
    searchfollowsubct:(value)=>{
        return db.load(`select * from article ar where ar.SubCatID=${value}`);
    },
    count:()=>{
        return db.load('select count(*) as total from article ')
    },
    pageByArt:(start_offset)=>{
        var limit=config.paginate.default;
        return db.load(`select * from article limit ${limit} offset ${start_offset}`);
    }

};