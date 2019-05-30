var db = require('../utils/db');
var config = require('../config/default.json');

module.exports = {
    getByArtID: id => {
        return db.load(`select * from article a join category c join subcategories s join writer w where a.ArtID = ${id} and a.CatID = c.CatID and a.SubCatID = s.SubCatID and a.WriterID = w.WriterID and c.CatIsActive = 1 and s.SubCatIsActive = 1`);
    },

    updateViews: entity => {
        var id = entity.ID;
        delete entity.ID;

        return db.update('article', 'ArtID', entity, id);
    },

    getTopFeatured: (top, start_offset) => {
        return db.load(`select * from article a join category c join subcategories s where a.Featured = 1 and a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 order by a.ArtPostedOn desc limit ${top} offset ${start_offset}`);
    },

    getTopByProperty: (top, property) => {
        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 order by a.${property} desc limit ${top}`);
    },

    getTheNewestOfCategories: () => {
        return db.load('select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.ArtPostedOn >= all (select b.ArtPostedOn from article b where b.CatID in (select CatID from article group by CatID order by sum(Views) desc) and b.CatID = a.CatID) limit 10');
    },

    getRandomTopByCatID: (top, catID) => {
        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID} order by rand() desc limit ${top}`);
    },

    getTopFeaturedOfCategory: (catID, top, start_offset) => {
        return db.load(`select * from article a join category c join subcategories s where a.Featured = 1 and a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID} order by a.ArtPostedOn desc limit ${top} offset ${start_offset}`);
    },

    countArticlesOfSubcategory: subcatID => {
        return db.load(`select count(*) total from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.SubCatID = ${subcatID}`);
    },

    pagingOfSubcategory: (subcatID, start_offset) => {
        var lim = config.paginate.default;

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.SubCatID = ${subcatID} order by a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    countArticlesOfCategory: catID => {
        return db.load(`select count(*) total from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID}`);
    },

    pagingOfCategory: (catID, start_offset) => {
        var lim = config.paginate.default;

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID} order by a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    countPremium: () => {
        return db.load('select count(*) total from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and RankID = 2');
    },

    pagingPremium: start_offset => {
        //var lim = config.paginate.default;

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and RankID = 2 order by a.ArtPostedOn desc limit 5 offset ${start_offset}`);
    },

    countByKeyword: keyword => {
        return db.load(`select count(distinct(a.ArtID)) total from article a left join category c on a.CatID = c.CatID left join subcategories s on a.SubCatID = s.SubCatID left join articletags ats on a.ArtID = ats.ArtID left join tag t on t.TagID = ats.TagID where (match(c.CatName) against('${keyword}') or match(s.SubCatName) against('${keyword}') or match(a.ArtTitle, a.Summary) against('${keyword}') or match(t.TagName) against ('${keyword}')) and c.CatIsActive = 1 and s.SubCatIsActive = 1`);
    },

    pagingByKeyword: (keyword, start_offset) => {
        var lim = config.paginate.default;
        
        return db.load(`select distinct(a.ArtID), a.CatID, a.SubCatID, a.ArtAvatar, a.ArtTitle, a.Summary, a.Content, a.RankID, a.ArtPostedOn, s.SubCatName from article a left join category c on a.CatID = c.CatID left join subcategories s on a.SubCatID = s.SubCatID left join articletags ats on a.ArtID = ats.ArtID left join tag t on t.TagID = ats.TagID where (match(c.CatName) against('${keyword}') or match(s.SubCatName) against('${keyword}') or match(a.ArtTitle, a.Summary) against('${keyword}') or match(t.TagName) against ('${keyword}')) and c.CatIsActive = 1 and s.SubCatIsActive = 1 order by a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },
};