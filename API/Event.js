module.exports = (app, dao) => {
    app.post( "/addevent", (req, res) => {
        const event = req.body;
        if (event.date === undefined) {
            res.status(400).end();
            return
        }
        dao.insert(event, (err) => {
                dao.getEventByAuthor(event.idUser, event.name, event.description, (event) => {
                    if (event == null) {
                        res.status(404).type('text/plain').end();
                    } else {
                        res.json(event)
                    }
                })
        })
    });
  
      app.post( "/participate/:iduser/:idevent", (req, res) => {
        dao.participate(req.params.iduser, req.params.idevent, (err) => {
                    if (res == null) {
                        res.status(404).type('text/plain').end();
                    } else {
                        res.status(200).type('text/plain').end();
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

    app.get("/event/:idUser/:name/:description", (req, res) => {
        dao.getEventByAuthor(req.params.idUser, req.params.name, req.params.description, (event) => {
            if (event == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(event)
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
  
      app.get("/participate/:id", (req, res) => {
        dao.getUserByEvent(req.params.id,(users) => {
            if (users == null) {
                res.status(404).type('text/plain').end();
            } else {
                res.json(users)
            }
        })
    });
};

