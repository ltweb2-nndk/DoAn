var db = require('../utils/db');
var date = require('../public/js/custom');

module.exports={
    getArticleTags: id=>{
       return db.load(`select t.TagName
                from articletags a inner join tag t on a.TagID=t.TagID
                WHERE ArtID=${id}`);
    }
};