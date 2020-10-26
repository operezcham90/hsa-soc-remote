const { Client } = require('pg');
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
exports.log = {};
exports.log.migrate = () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    client.connect().then(() => {
        const statement = `CREATE TABLE IF NOT EXISTS log (
            message text,
            moment timestamp);`;
        client.query(statement, (err, res) => {
            console.log(err || res);
            client.end();
        });
    });
};
exports.log.post = (message, callback) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    client.connect().then(() => {
        const statement = `INSERT INTO log VALUES ($1, NOW());`;
        if (typeof message === 'string') {
            client.query(statement, [message], (err, res) => {
                console.log(err || res);
                client.end();
                callback(true);
            });
        } else {
            callback(false);
        }
    });
};
exports.log.get = (callback) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    client.connect().then(() => {
        const statement = `SELECT * FROM log
            ORDER BY moment DESC
            LIMIT 50;`;
        client.query(statement, (err, res) => {
            console.log(err || res);
            client.end();
            const rows = [];
            for (let i = 0; i < res.rows.length; i++) {
                rows.push({
                    message: res.rows[i].message,
                    moment: timeSince(res.rows[i].moment)
                });
            }
            callback(rows);
        });
    });
};
exports.log.delete = (callback) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    client.connect().then(() => {
        const statement = `DELETE FROM log;`;
        client.query(statement, (err, res) => {
            console.log(err || res);
            client.end();
            callback(true);
        });
    });
};