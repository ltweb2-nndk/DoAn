var db = require('../utils/db');

module.exports = {
    getByArtID: artID => {
        return db.load(`select * from tag t join articletags ats where t.TagID = ats.TagID and ats.ArtID = ${artID}`);
    },

    getArticleTags: id => {
        return db.load(`select t.TagName
                from articletags a inner join tag t on a.TagID=t.TagID
                WHERE ArtID=${id}`);
    },

    add: (entity) => {
        return db.add('articletags', entity);
    },

    delete: artID => {
        return db.delete('articletags', 'ArtID', artID);
    }
};