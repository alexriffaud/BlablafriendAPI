const event = require('../Models/event.js');

module.exports = class eventDAO {
    constructor(db) {
        this.db = db;
    }
    update(id, event, done) {
        const stmt = this.db.query("UPDATE event SET name=?, date=?, description=?, localization=?, idUser=? WHERE id=?");
        stmt.run(event.name, event.date, event.description, event.localization, event.idUser, id, done);
        stmt.finalize();
    }
    delete(id, done) {
        const stmt = this.db.query("DELETE FROM event WHERE id=?");
        stmt.run(id, done);
        stmt.finalize();
    }

    getById(id, done) {
        let event = null;
        this.db.each("SELECT * FROM event WHERE id = ?", [id],
            (err, row) => { if (err == null) event = Object.assign(new event(), row) },
            () => {done(event) }
        )
    }

    getAll(done) {
        let events = [];
        this.db.query("SELECT * FROM event;",
            (err, row) => {
                if (err == null) {
                    let p = new event(row.name, row.date, row.description, row.localization, row.idUser);
                    p.id = row.id;
                    events.push(p);
                }
            },
            (err) => {
                if (err == null && done) {
                    done(events)
                }
            })
    }

    getByAuthor(id,done) {
        let events = [];
        this.db.query("SELECT * FROM event where idUser= ?;", [id],
            (err, row) => {
                if (err == null) {
                    let p = new event(row.name, row.date, row.description, row.localization, row.idUser);
                    p.id = row.id;
                    events.push(p);
                }
            },
            (err) => {
                if (err == null && done) {
                    done(events)
                }
            })
    }

    insert(event, done) {
        const stmt = this.db.query("INSERT INTO event(name, date, description, localization, idUser) VALUES (?, ?, ?, ?, ?)");
        stmt.run([event.name, event.date, event.description, event.localization, event.idUser], done);
        stmt.finalize();
    }
};