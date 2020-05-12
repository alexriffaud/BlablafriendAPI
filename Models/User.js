module.exports = class User {
    constructor(login, password, firstname, lastname, email, city, birthday, localization, description, isLogged) {
        this.id = null;
        this.login = login;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
		this.city = city;
        this.birthday = birthday;
		this.localization = localization;
        this.description = description;
        this.isLogged = isLogged;
    }
};