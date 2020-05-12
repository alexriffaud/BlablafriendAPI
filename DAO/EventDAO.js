const event = require('../Models/event.js');

module.exports = class eventDAO {
    constructor(db) {
        this.db = db;
    }
    update(id, event, done) {
        this.db.query("UPDATE event SET name=?, date=?, description=?, localization=?, idUser=? WHERE id=?",
            event.name, event.date, event.description, event.localization, event.idUser,
            (err,rows) => {
                if (err) {
                    throw err;
                } else {
                    done(rows);
                }
            });
    }
    delete(id, done) {
        this.db.query("DELETE FROM event WHERE id=?", [id], (err, result) => {
            if (err) {
                throw err;
            } else {
                done(result);
            }
        });
    }

    getById(id, done) {
        this.db.query("SELECT * FROM event WHERE id = ?", [id], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getAll(done) {
        let events = [];
        this.db.query("SELECT * FROM event;", (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getByAuthor(id,done) {
        this.db.query("SELECT * FROM event where idUser= ?;", [id], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    insert(event, done) {
        this.db.query("INSERT INTO event SET ?", event, (err, res) => {
            if (err) {
                throw err;
            } else {
                done(res);
            }
        });
    }
};