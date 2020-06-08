module.exports = (app, dao) => {

    app.get("/test", (req, res) => {
        res.json(req.test)
    });

    app.get("/user", (req, res) => {
        res.json(req.user.id)
    });

    app.get("/myuser", (req, res) => {
        dao.getByLogin(req.user.login, (user) => {
            if (user == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(user)
            }
        })
    });

    app.get("/users", (req, res) => {
        dao.getAllUser((users) => {
            if (users == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(users)
            }
        })
    });

    app.get("/user/:id", (req, res) => {
        dao.getById(req.params.id, (user) => {
            if (user == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(user)
            }
        })
    });

    app.get("/userMail/:mail", (req, res) => {
        dao.getByMail(req.params.mail, (user) => {
            if (user == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(user)
            }
        })
    });

    app.get("/userName/:name", (req, res) => {
        dao.getByName(req.params.name, (user) => {
            if (user == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(user)
            }
        })
    });

    app.put("/user/:id", (req, res) => {
        const user = req.body;
        if (user.login === undefined) {
            res.status(400).type('text/plain').end();
            return
        }
        dao.update(req.params.id, user, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end();
            } else {
                res.status(500).end();
            }
        })
    });

    app.delete("/user/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end();
            } else {
                res.status(500).end();
            }
        })
    });

    app.post("/user", (req, res) => {
        const user = req.body;
        if (user.login === undefined) {
            res.status(400).end();
            return
        }
        dao.insert(user, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end();
            } else {
                res.status(500).end();
            }
        });
    });

    app.get("/login/:name/:password", (req, res) => {

        dao.login(req.params.name, req.params.password, (user) => {
            if (user == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(user)
            }
        })
    });
};