var db = require('../ultils/db');

module.exports = {
    all: () => {
        return db.load('select * from category');
    }
};