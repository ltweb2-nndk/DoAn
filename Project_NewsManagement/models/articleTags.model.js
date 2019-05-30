var db = require('../utils/db');
var config = require('../config/default.json');

module.exports = {
    getByArtID: artID => {
        return db.load(`select * from tag t join articletags ats where t.TagID = ats.TagID and ats.ArtID = ${artID}`);
    }
};