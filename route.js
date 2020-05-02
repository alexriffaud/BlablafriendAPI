const User = require("./Models/User.js");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs-extra') // This imports the fs-extra dependency
var request = require('request') // This imports the request dependency

fs.ensureDirSync('css') // This creates a folder called css




module.exports = (app, passport, auth, userDAO) => {

    const web = __dirname + '/web/';
    const css = web + '/css/';
    const js = web + '/js/';

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/upload', upload.single('myFile'),  function(req, res) {
        let filename ='./uploaded/' + req.file.filename + req.file.mimetype.replace(/[^\/]+\//gm, ".");
        fs.move( req.file.path,filename, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                res.end(filename)
            }

        });
    });


    app.get(['/login'] , (req, res) => {
        if (req.originalUrl === '/') {
            res.sendFile(web + 'index.html');
            return
        }
        res.sendFile(web + req.path  + '.html')
    });

    app.get(['/registration', '/contact'], (req, res) => {
        res.sendFile(web + req.path + '.html')
    });

    app.post('/contact', function (req, res, next) {

        let transporter = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: "mitsugaya.////@gmail.com",
                pass: "/////"
            }
        });

        let mailOptions = {
            from: req.body.sender,
            to: req.body.destination,
            subject: req.body.subject,
            text: req.body.message,
            html: '<b>' + req.body.message + '</b>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        transporter.close();
    });

    app.post('/authenticate', passport.authenticate('local-login', {
            failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/index?username='+req.user.login);
    });

    app.get(['/', '/index', '/challenges', '/usersAdmin', '/admin', '/about', '/myList', '/profil', '/challenge', '*.html'], auth.isLoggedInWeb, (req, res) => {
        if (req.originalUrl === '/') {
            res.sendFile(web + 'index.html');
            return
        }
        res.sendFile(web + req.path + '.html')
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    });

    app.get('/currentUser', (req, res) => {
        req.logout();
        res.redirect('/')
    });


    app.get('*.jpeg', (req, res) => {

        res.sendFile("C:/Users/Alex/Desktop/Challenger-Project/"+req.path);
    });

    app.get('*.css', (req, res) => {
        res.sendFile(css + req.path)
    });

    app.get('*.js', (req, res) => {
        res.sendFile(js + req.path)
    });

};
