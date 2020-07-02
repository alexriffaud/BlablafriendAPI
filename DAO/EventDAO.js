const event = require('../Models/Event.js');

module.exports = class eventDAO {
    constructor(db) {
        this.db = db;
    }
    update(id, event, done) {
        this.db.query("UPDATE event SET name=?, date=?, description=?, localization=?, hour=?, idUser=? WHERE id=?",
            [event.name, event.date, event.description, event.localization, event.idUser,event.hour, id],
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
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, user.login FROM event LEFT JOIN user ON event.iduser = user.id WHERE id = ?", [id], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getAll(done) {
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, event.hour, user.login FROM event LEFT JOIN user ON event.iduser = user.id;", (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getEventByAuthor(idUser, name, description, done) {
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, event.hour, user.login FROM event LEFT JOIN user ON event.iduser = user.id WHERE event.iduser = ? AND event.name = ? AND event.description = ?;", [idUser, name, description], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getByAuthor(id,done) {
        this.db.query("SELECT event.id, event.name, event.description, event.localization, event.date, event.hour, user.login FROM event LEFT JOIN user ON event.iduser = user.id WHERE idUser= ?;", [id], (err,rows) => {
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
        this.db.query("INSERT INTO `event` (name, description, date, localization, iduser, hour) VALUES (?, ?, ?, ?, ?, ?)", [event.name, event.description, event.date, event.localization, event.idUser, event.hour], (err, res) => {
            if (err) {
                throw err;
            } else {
                done(res);
            }
        });
    }
  
      participate(iduser, idevent, done) {
        this.db.query("INSERT INTO `joineventuser` (iduser, idevent) VALUES (?, ?)", [iduser, idevent], (err, res) => {
            if (err) {
                throw err;
            } else {
                done(res);
            }
        });
    }
  
      getUserByEvent(id,done) {
        this.db.query("SELECT user.login FROM joineventuser LEFT JOIN user ON joineventuser.iduser = user.id WHERE joineventuser.idevent=?;", [id], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }
};


