var db = require('../utils/db');
var config = require('../config/default.json');
var date = require('../public/js/custom');

module.exports = {
    
    getByArtID: id => {
        return db.load(`select * from article a join category c join writer w 
        where a.ArtID = ${id} and a.CatID = c.CatID and a.WriterID = w.WriterID and c.CatIsActive = 1`);
    },

    getSomeByID: artID => {
        return db.load(`select * from article a join category c join writer w 
        where a.ArtID = ${artID} and a.CatID = c.CatID and a.WriterID = w.WriterID and c.CatIsActive = 1`);
    },

    update: (id, entity) => {
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

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.SubCatID = ${subcatID} order by a.RankID desc, a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    countArticlesOfCategory: catID => {
        return db.load(`select count(*) total from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID}`);
    },

    pagingOfCategory: (catID, start_offset) => {
        var lim = config.paginate.default;

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and a.CatID = ${catID} order by a.RankID desc, a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    countPremium: () => {
        return db.load('select count(*) total from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and RankID = 2');
    },

    pagingPremium: start_offset => {
        var lim = config.paginate.default;

        return db.load(`select * from article a join category c join subcategories s where a.CatID = c.CatID and a.SubCatID = s.SubCatID and c.CatIsActive = 1 and s.SubCatIsActive = 1 and RankID = 2 order by a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    countByKeyword: keyword => {
        return db.load(`select count(distinct(a.ArtID)) total from article a left join category c on a.CatID = c.CatID left join subcategories s on a.SubCatID = s.SubCatID left join articletags ats on a.ArtID = ats.ArtID left join tag t on t.TagID = ats.TagID where (match(c.CatName) against('${keyword}') or match(s.SubCatName) against('${keyword}') or match(a.ArtTitle, a.Summary) against('${keyword}') or match(t.TagName) against ('${keyword}')) and c.CatIsActive = 1 and s.SubCatIsActive = 1`);
    },

    pagingByKeyword: (keyword, start_offset) => {
        var lim = config.paginate.default;

        return db.load(`select distinct(a.ArtID), a.*, c.*, s.* from article a left join category c on a.CatID = c.CatID left join subcategories s on a.SubCatID = s.SubCatID left join articletags ats on a.ArtID = ats.ArtID left join tag t on t.TagID = ats.TagID where (match(c.CatName) against('${keyword}') or match(s.SubCatName) against('${keyword}') or match(a.ArtTitle, a.Summary) against('${keyword}') or match(t.TagName) against ('${keyword}')) and c.CatIsActive = 1 and s.SubCatIsActive = 1 order by a.RankID desc, a.ArtPostedOn desc limit ${lim} offset ${start_offset}`);
    },

    all: () => {
        return db.load('select * from article');
    },

    single: (id) => {
        return db.load(`select * from article ar where ArtID=${id}`)
    },
    delete: id => {
        return db.delete('article', 'ArtID', id);
    },

    search: (keyword) => {
        return db.load(`select * from article ar where ar.ArtID like '${keyword}' or ar.ArtTitle like N'%${keyword}%'`);
    },

    searchByCat: (keyword) => {
        return db.load(`select * from article ar where ar.CatID=${keyword}`);
    },
    searchByStatus:(StatusID)=>{
        return db.load(`select * from article ar where ar.StatusID=${StatusID}`);
    },
    count: () => {
        return db.load('select count(*) as total from article ')
    },

    pageByArt: (start_offset) => {
        var limit = config.paginate.default;
        return db.load(`select * from article limit ${limit} offset ${start_offset}`);
    },
    searchCountByKeyWord:(keyword)=>{
        return db.load(`select count(*) as total  from article ar where ar.ArtID like '${keyword}' or ar.ArtTitle like N'%${keyword}%'`);
    },
    searchPageByKeyword:(keyword,start_offset)=>{
        var limit = config.paginate.default;
        return db.load(`select * from article ar where  ar.ArtID like  '${keyword}' or ar.ArtTitle like N'%${keyword}%' limit ${limit} offset ${start_offset}`);
    },
    searchByCatCount:(CatID,keyword)=>{
        return db.load(`select count(*) as total  from article ar where ar.CatID=${CatID} and (ar.ArtID like '${keyword}' or ar.ArtTitle like N'%${keyword}%')`);
    },
    searchPageByCat:(CatID,keyword,start_offset)=>{
        var limit = config.paginate.default;
        return db.load(`select * from article ar where ar.CatID=${CatID} and (ar.ArtID like '${keyword}' or ar.ArtTitle like N'%${keyword}%') limit ${limit} offset ${start_offset}`);
    },

    getByStatus: statusID => {
        return db.load(`select ArtID,ArtTitle,Summary,ArtCreatedOn,ArtPostedOn,StatusID from article where StatusID = ${statusID}`);
    },

    getByCat: catID => {
        return db.load(`select* from article where CatID = ${catID}`);
    },

    add: (entity) => {
        var link = "/img/article/" + entity.artAvar
        var params = {
            "ArtTitle": entity.ArtTitle,
            "Summary": entity.Summary,
            "Content": entity.Content,
            "CatID": entity.CatID,
            "StatusID": entity.StatusID,
            "RankID": entity.RankID,
            "WriterID": entity.WriterID,
            "ArtCreatedOn": date.getDateTimeNow(),
            "StatusID": 1,
            "ArtAvatar": link,
            "Views":0,
            "Featured":0
        }
        return db.add('article', params);
    },

    countAllDraft:EditorID=>{
        return db.load(`select count(*) as total from article a join category c on a.CatID=c.CatID where c.EditorID=${EditorID} and a.StatusID=1`);
    },
    countByStatus: (id,writerID) => {
        return db.load(`select count(StatusID) as total from article where StatusID=${id} and WriterID=${writerID} GROUP BY StatusID`);
    },

    countByCat: (catID) => {
        return db.load(`select count(CatID) as total from article where CatID=${catID} GROUP BY CatID`);
    },

    countDraftByCat: (catID) => {
        return db.load(`select count(CatID) as total from article where CatID=${catID} and StatusID=1 GROUP BY CatID`);
    },
    // countAllDraft:(editorID)=>{
    //     return db.load(`select* from article a join cate`)
    // }
    pageByStatus: (stusID,writerID, start_offset) => {
        var lim = config.paginate.default;
        return db.load(`select a.ArtID,a.ArtAvatar,a.ArtTitle,a.Summary,a.StatusID,s.StatusName 
        from article a join status s on a.StatusID = s.StatusID
        where a.StatusID = ${stusID} and WriterID=${writerID} limit ${lim} offset ${start_offset}`);
    },

    pageByCat: (catID, start_offset) => {
        var lim = config.paginate.default;
        return db.load(`select * from article a join category c on a.CatID = c.CatID  where a.CatID = ${catID} and a.StatusID=1 limit ${lim} offset ${start_offset}`);
    },
    pageAll:(editID,start_offset)=>{
        var lim = config.paginate.default;
        return db.load(`select * from article a join category c on a.CatID = c.CatID  where a.StatusID=1 and c.EditorID = ${editID} limit ${lim} offset ${start_offset} `)
    },
    countArtOfWriter: writerID=>{
        return db.load(`select s.* , count(a.ArtID) as total from status s left join article a on s.StatusID = a.StatusID where a.WriterID = ${writerID} group by s.StatusID`)
    },
    countArtEdited: EditorID=>{
        return db.load(`select count(*) as nArt from article where EditorID = ${EditorID}`);
    },
    pageArtEdited:(editID,start_offset)=>{
        var lim = config.paginate.default;
        return db.load(`select* from article where EditorID = ${editID} limit ${lim} offset ${start_offset}`);
    }
};  