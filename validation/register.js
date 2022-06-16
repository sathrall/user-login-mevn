const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // convert empty fields to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";

    // check to see if the name field is filled
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    // check to see if we have a valid email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email address";
    }

    // verify our password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Passwords must match";
    }

    // return the errors
    return {
        errors,
        isValid: isEmpty(errors)
    }
}