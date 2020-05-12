const EventDAO = require("./DAO/EventDAO.js");
const Event = require("./Models/Event.js");
const UserDAO = require('./DAO/UserDAO');
const User = require("./Models/User.js");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const db = require('mysql');

let con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    insecureAuth : true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


const app = express();
app.use(cookieParser());
app.use(cookieSession({keys: ['secretKey']}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());
const userDAO = new UserDAO(db);
const auth = require('./passport')(passport, userDAO);
const eventDAO = new EventDAO(db, auth);

require('./API/Event')(app, eventDAO);
require('./API/User')(app, userDAO, auth);
require('./route')(app, passport, auth, userDAO);


app.listen(3333);
