var db = require('../utils/db');

module.exports = {
    getByArtID: id => {
        return db.load(`select * from article a join subcategories s join writer w where ArtID = ${id} and a.SubCatID = s.SubCatID and a.WriterID = w.WriterID`);
    }
};