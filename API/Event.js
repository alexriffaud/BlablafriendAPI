module.exports = (app, dao) => {
    app.post( "/addevent", (req, res) => {
        const event = req.body;
        if (event.creationDate === undefined) {
            res.status(400).end();
            return
        }
        dao.insert(event, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    });

    app.post( "/addList/:idUser?:idEvent", (req, res) => {
        dao.insertList(req.params.idUser, req.params.idEvent, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    });

    app.delete("/event/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    });

    app.put("/eventEdit/:id", (req, res) => {
        const event = req.body;
        dao.update(req.params.id, event, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    });

    app.get("/idEvent/:id", (req, res) => {
        dao.getById(req.params.id, (event) => {
            if (event == null) {
                res.status(404).type('text/plain').end();
            } else {

                res.json(event)
            }
        })
    });

    app.get("/challengeLike/:idUser:idEvent", (req, res) => {
        dao.getLikeForUser(req.params.idUser, req.params.idEvent, (event) => {
            if (event == null) {
                res.status(404).type('text/plain').end();
            } else {

                res.json(event)
            }
        })
    });

    app.get("/userAddList/:idUser:idEvent", (req, res) => {
        dao.getListForUserChallenge(req.params.idUser, req.params.idEvent, (event) => {
            if (event == null) {
                res.status(404).type('text/plain').end();
            } else {

                res.json(event)
            }
        })
    });

    app.get("/listPerso/:idUser", (req, res) => {
        dao.getListForUser(req.params.idUser, (events) => {
            if (events == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(events)
            }
        })
    });

    app.get("/Allevents", (req, res) => {
        dao.getAll((events) => {
            if (events == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(events)
            }
        })
    });

    app.get("/events/:id", (req, res) => {
        dao.getByAuthor(req.params.id,(events) => {
            if (events == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(events)
            }
        })
    });
};