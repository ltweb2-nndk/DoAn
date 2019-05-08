var mysql = require('mysql');
var config = require('../config/default.json');

var createConnection = () => mysql.createConnection(config.mysql);

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();

            connection.query(sql, (error, results, fields) => {
                if (error) reject(error);
                else resolve(results);
                
                connection.end();
            });
        });
    },
    loadCount: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();

            connection.query(sql, (error, results, fields) => {
                if (error) reject(error);
                else resolve(results.length);
                
                connection.end();
            });
        });
    },
    add: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();

            var sql = `insert into ${tableName} set ?`;
            connection.query(sql, entity, (error, results) => {
                if (error) reject(error);
                else resolve(results.insertId);
                
                connection.end();
            });
        });
    },
    update: (tableName, idField, entity, id) => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();

            var sql = `update ${tableName} set ? where ${idField} = ?`;
            connection.query(sql, [entity, id], (error, results, fields) => {
                if (error) reject(error);
                else resolve(results.changedRows);
                
                connection.end();
            });
        });
    },
    delete: (tableName, idField, id) => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();

            var sql = `delete from ${tableName} where ${idField} = ?`;
            connection.query(sql, id, (error, results, fields) => {
                if (error) reject(error);
                else resolve(results.afftectedRows);
                
                connection.end();
            });
        });
    }
};