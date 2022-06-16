const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // convert empty fields to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // check to see if the name field is filled
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    // verify our password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // return the errors
    return {
        errors,
        isValid: isEmpty(errors)
    }
}