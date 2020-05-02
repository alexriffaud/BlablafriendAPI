const LocalStrategy = require('passport-local').Strategy;
const User = require('./Models/User');

module.exports =  (passport, userDao) => {
    passport.serializeUser((user, done) => {
        done(null, user.login)
    });

    passport.deserializeUser((login, done) => {
        done(null, new User(login))
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, login, password, done) => {
            userDao.getByLogin(login, (user) => {
                if (user != null && userDao.comparePassword(password, user.password)) {
                    return done(null, new User(login))
                } else {
                    return done(null, false)
                }
            })
        })
    );
    var defaultUser = null;

    return {
        isLoggedInAPI(req, res, next) {
            if (defaultUser != null) {
                req.user = defaultUser;
                return next()
            }
            if (req.isAuthenticated()) {
                return next()
            }
            res.status(401).type("text/plain").end()
        },
        isLoggedInWeb(req, res, next) {
            if (defaultUser != null) {
                req.user = defaultUser;
                return next()
            }
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/login')
        }
    }
};