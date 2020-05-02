const event = require('../Models/event.js');

module.exports = class eventDAO {
    constructor(db) {
        this.db = db;
    }
    update(id, event, done) {
        const stmt = this.db.prepare("UPDATE event SET name=?, describe=?, nbLike=?, nbComment=?, creationDate=?, idAuthor=?, isValidated=?, isHide=? WHERE id=?");
        stmt.run(event.name, event.describe, event.nbLike, event.nbComment, event.creationDate, event.idAuthor,event.isValidated, event.isHide, id, done);
        stmt.finalize();
    }
    delete(id, done) {
        const stmt = this.db.prepare("DELETE FROM event WHERE id=?");
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
        this.db.each("SELECT * FROM event;",
            (err, row) => {
                if (err == null) {
                    let p = new event(row.name, row.describe, row.nbLike, row.nbComment, row.creationDate, row.idAuthor, row.isValidated, row.isHide);
                    p.id = row.idevent;
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
        this.db.each("SELECT * FROM event where idUser= ?;", [id],
            (err, row) => {
                if (err == null) {
                    let p = new event(row.name, row.describe, row.nbLike, row.nbComment, row.creationDate, row.idAuthor, row.isValidated, row.isHide);
                    p.id = row.idevent;
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
        const stmt = this.db.prepare("INSERT INTO event(name, describe, nbLike, nbComment, creationDate, idAuthor, isValidated, isHide) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        stmt.run([event.name, event.describe, event.nbLike, event.nbComment, event.creationDate, event.idAuthor, event.isValidated, event.isHide], done);
        stmt.finalize();
    }
};