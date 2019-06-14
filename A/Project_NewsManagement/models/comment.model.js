var db = require('../utils/db');

module.exports = {
    add: entity => {
        return db.add('comment', entity);
    },

    getByArtID: id => {
        return db.load(`select * from article a join comment c on a.ArtID = c.ArtID join subscriber s on s.SubscriberID = c.SubscriberID where a.ArtID = ${id} order by c.CommentCreatedOn desc`);
    },

    getByCommentID: id => {
        return db.load(`select * from article a join comment c on a.ArtID = c.ArtID join subscriber s on s.SubscriberID = c.SubscriberID where c.CommentID = ${id} order by c.CommentCreatedOn desc`);
    }
};