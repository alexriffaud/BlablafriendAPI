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
        this.db.query("SELECT * FROM user WHERE login = ?", [login], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    login(login, password, done)
    {
        this.db.query("SELECT id, firstname, lastname, login FROM user WHERE login = ? AND password = ?", [login, password], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    insert(user, done) {
        this.db.query("INSERT INTO user SET ?", user, (err, res) => {
            if (err) {
                throw err;
            } else {
                done(res);
            }
        });
    }


    getAllUser(done) {
        this.db.query("SELECT * FROM user;", (err,rows) => {
            if(err) {
                throw err;
            }
            else {
                done(rows);
            }
        });
    }
    getById(id, done) {
        this.db.query("SELECT * FROM user WHERE id = ?", [id], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getByName(login, done) {
        this.db.query("SELECT * FROM user WHERE login = ?", [login], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    getByMail(email, done) {
        this.db.query("SELECT * FROM user WHERE email = ?", [email], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    update(id, user, done) {
        this.db.query("UPDATE user SET login=?,passwordhash=?, firstname=?, lastname=?, email=?, city=?, birthday=?, localization=?, description=?, islogged=?  WHERE id=?;",
            [user.login, user.password, user.firstname, user.lastname, user.email, user.city, user.birthday, user.localization, user.description, user.isLogged, id],
            (err,rows) => {
                if (err) {
                    throw err;
                } else {
                    done(rows);
                }
            });
    }

    delete(id, done) {
        this.db.query("DELETE FROM user WHERE id=?", [id], (err, result) => {
            if (err) {
                throw err;
            } else {
                done(result);
            }
        });
    }
};
