const User = require('../Models/User');

module.exports = class UserDAO {
    constructor(db) {
        this.db = db;
    }

    getByLogin(login, done) {
        this.db.query("SELECT * FROM `user` WHERE login = ?", [login], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    login(login, password, done)
    {
        this.db.query("SELECT * FROM user WHERE login = ? AND password = ?", [login, password], (err,rows) => {
            if (err) {
                throw err;
            } else {
                done(rows);
            }
        });
    }

    insert(user, done) {
        this.db.query("INSERT INTO `user` (login, firstname, lastname, email, city, birthday, password, localization, description, islogged) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [user.login, user.firstname, user.lastname, user.email, user.city, user.birthday, user.password, "", user.description, 0], (err, res) => {
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
        this.db.query("UPDATE user SET login=?, firstname=?, lastname=?, city=?, description=? WHERE id=?;",
            [user.login, user.firstname, user.lastname, user.city, user.description, id],
            (err,rows) => {
                if (err) {
                    throw err;
                } else {
                    done(rows);
                }
            });
    }

    disconnectUser(id, done) {
        this.db.query("UPDATE user SET islogged=?  WHERE id=?;",
            [0, id],
            (err,rows) => {
                if (err) {
                    throw err;
                } else {
                    done(rows);
                }
            });
    }

    connectUser(id, done) {
        this.db.query("UPDATE user SET islogged=?  WHERE id=?;",
            [1, id],
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


