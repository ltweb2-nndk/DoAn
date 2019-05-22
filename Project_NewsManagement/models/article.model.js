var db = require('../utils/db');
var date = require('../public/js/custom');
var config=require('../config/default.json');
module.exports = {
    getByArtID: id => {
        return db.load(`select * from article a join subcategories s join writer w 
        where ArtID = ${id} and a.SubCatID = s.SubCatID and a.WriterID = w.WriterID`);
    },
    getByStatus: statusID => {
        return db.load(`select ArtID,ArtTitle,Summary,ArtCreatedOn,ArtPostedOn,StatusID from article where StatusID = ${statusID}`);
    },
    add:(entity)=>{
         delete entity.TagID;
         var params={
             //"SubCatID":entity.SubCatID,

             "ArtTitle":entity.ArtTitle,
             "Summary":entity.Summary,
             "Content":entity.Content,
             "SubCatID":entity.SubCatID,
             "StatusID":entity.StatusID,
             "RankID":entity.RankID,
             "WriterID":entity.WriterID,
            "ArtCreatedOn":date.getDateTimeNow()
         }
         return db.add('article',params);
    },
    update: entity=>{
        var id = entity.ArtID;
        delete entity.TagID;
        var params={
            "ArtTitle":entity.ArtTitle,
            "Summary":entity.Summary,
            "Content":entity.Content,
            "SubCatID":entity.SubCatID,
            "StatusID":entity.StatusID,
            "RankID":entity.RankID,
            "WriterID":entity.WriterID,
            "ArtCreatedOn":date.getDateTimeNow()
        }
        return db.update('article','ArtID',entity,id);
    },
    all:()=>{
        return db.load('select * from article');
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