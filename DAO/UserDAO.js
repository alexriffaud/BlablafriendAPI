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
        this.db.query("SELECT * FROM user WHERE login = ?", [login],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }
    insert(user, done) {
        const stmt = this.db.query("INSERT INTO user(login, passwordhash, firstname, lastname, email, city, birthday, localization, description, isLogged) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ?, ?)");
        stmt.run([user.login, this.hashPassword(user.password), user.firstname, user.lastname, user.email, user.city, user.birthday, user.localization, user.description, user.isLogged], done);
        stmt.finalize();
    }


    getAllUser(done) {
        let users = [];
        this.db.query("SELECT * FROM user;",
            (err, row) => {
                if (err == null) {
                    let p = new User(row.login, row.password, row.firstname, row.lastname, row.email, row.city, row.birthday, row.localization, row.description, row.isLogged);
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
        this.db.query("SELECT * FROM user WHERE id = ?", [id],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }

    getByName(login, done) {
        let user = null;
        this.db.query("SELECT * FROM user WHERE login = ?", [login],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }

    getByMail(email, done) {
        let user = null;
        this.db.query("SELECT * FROM user WHERE email = ?", [email],
            (err, row) => { if (err == null) user = Object.assign(new User(), row) },
            () => { done(user) }
        )
    }
    update(id, user, done) {
        const stmt = this.db.query("UPDATE user SET login=?,passwordhash=?, firstname=?, lastname=?, email=?, city=?, birthday=?, localization=?, description=?, islogged=?  WHERE id=?;");
        stmt.run(user.login, user.password, user.firstname, user.lastname, user.email, user.city, user.birthday, user.localization, user.description, user.isLogged, id, done);
        stmt.finalize();
    }

    delete(id, done) {
        const stmt = this.db.query("DELETE FROM user WHERE id=?");
        stmt.run(id, done);
        stmt.finalize();
    }
};
