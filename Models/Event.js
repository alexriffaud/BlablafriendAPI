module.exports = class Event {
    constructor(name, date, description, localization, idUser) {
        this.id = null;
        this.name = name;
        this.date = date;
        this.description = description;
        this.localization = localization;
        this.idUser = idUser;
    }
};