module.exports = class Event {
    constructor(name, date, description, localization, idUser, hour) {
        this.id = null;
        this.name = name;
        this.date = date;
        this.description = description;
        this.localization = localization;
        this.idUser = idUser;
      	this.hour = hour;
    }
};
