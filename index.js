const EventDAO = require("./DAO/EventDAO.js");
const Event = require("./Models/Event.js");
const UserDAO = require('./DAO/UserDAO');
const User = require("./Models/User.js");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const db = require('mysql');

let con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    insecureAuth : true,
    database: 'blablafriend'
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

const userDAO = new UserDAO(con);
const eventDAO = new EventDAO(con);

require('./API/Event')(app, eventDAO);
require('./API/User')(app, userDAO);


app.listen(3000, () => console.log('Server running on port 3000!'))
