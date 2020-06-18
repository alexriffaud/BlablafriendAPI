const event = require('../Models/event.js');

module.exports = class eventDAO {
    constructor(db) {
        this.db = db;
    }
    update(id, event, done) {
        this.db.query("UPDATE event SET name=?, date=?, description=?, localization=?, idUser=? WHERE id=?",
            [event.name, event.date, event.description, event.localization, event.idUser, id],
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
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, user.login FROM event LEFT JOIN user ON event.iduser = user.id;", (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getEventByAuthor(idUser, name, description, done) {
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, user.login FROM event LEFT JOIN user ON event.iduser = user.id WHERE event.iduser = ? AND event.name = ? AND event.description = ?;", [idUser, name, description], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getByAuthor(id,done) {
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, user.login FROM event LEFT JOIN user ON event.iduser = user.id WHERE idUser= ?;", [id], (err,rows) => {
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

    insert(event, done) {
        this.db.query("INSERT INTO `event` (name, description, date, localization, iduser) VALUES (?, ?, ?, ?, ?)", [event.name, event.description, event.date, event.localization, event.idUser], (err, res) => {
            if (err) {
                throw err;
            } else {
                done(res);
            }
        });
    }
};