const bcrypt = require('bcrypt');
const User = require('../Models/User');

module.exports = class UserDAO {
    constructor(db) {
        this.db = db;
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    getByLogin(login, done) {
        let user = null;
        this.db.each("SELECT * FROM user WHERE login = ?", [login],
            (err, row) => { if (err == null) {user = new User(row.login, row.passwordhash, row.admin, row.mail, row.isLogged); user.id = row.id} },
            () => { done(user) }
        )
    }
    insert(user, done) {
        const stmt = this.db.prepare("INSERT INTO user(login,passwordhash,admin,mail, isLogged) VALUES (?, ?, ?, ? ,?)");
        stmt.run([user.login, this.hashPassword(user.password), user.admin, user.mail, user.isLogged], done);
        stmt.finalize();
    }


    getAllUser(done) {
        let users = [];
        this.db.each("SELECT * FROM user;",
            (err, row) => {
                if (err == null) {
                    let p = new User(row.login, row.password, row.admin, row.mail);
                    p.id = row.id;
                    users.push(p);
                }
            },
            (err) => {
                if (err == null && done) {
                    done(users)
                }
            })
    }
    getById(id, done) {
        let user = null;
        this.db.each("SELECT * FROM user WHERE idUser = ?", [id],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }

    getByName(name, done) {
        let user = null;
        this.db.each("SELECT * FROM user WHERE login = ?", [name],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }

    getByMail(mail, done) {
        let user = null;
        this.db.each("SELECT * FROM user WHERE mail = ?", [mail],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }
    update(id, user, done) {
        const stmt = this.db.prepare("UPDATE user SET login=?,passwordhash=?, admin=?, mail=? WHERE idUser=?;");
        stmt.run(user.login, user.password, user.admin, user.mail, id, done);
        stmt.finalize();
    }

    delete(id, done) {
        const stmt = this.db.prepare("DELETE FROM user WHERE idUser=?");
        stmt.run(id, done);
        stmt.finalize();
    }
};
