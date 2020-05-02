const sqlite3 = require("sqlite3");
const ChallengeDAO = require("./DAO/ChallengeDAO.js");
const Challenge = require("./Models/Challenge.js");
const CommentDAO = require("./DAO/CommentDAO.js");
const Commenti = require("./Models/Commenti.js");
const UserDAO = require('./DAO/UserDAO');
const User = require("./Models/User.js");
const PersonalListDAO = require('./DAO/PersonalListDAO');
const PersonalList = require("./Models/PersonnalList.js");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const db = new sqlite3.Database("./mabase.db");




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
const challengeDAO = new ChallengeDAO(db, auth);
const commentDAO = new CommentDAO(db);

const personalListDAO = new PersonalListDAO(db);
require('./seeder.js')(challengeDAO, commentDAO, userDAO, personalListDAO);


require('./API/Challenge')(app, challengeDAO);
require('./API/Comment')(app, commentDAO);
require('./API/User')(app, userDAO, auth);
require('./route')(app, passport, auth, userDAO);


const multer = require("multer");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "/path/to/temporary/directory/to/store/uploaded/files"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
    }
);

app.listen(3333);
