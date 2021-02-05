export function validateSignIn(values) {
    let errors = {};
    if (!values.login) {
        errors.login = "Login is required";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 5) {
        errors.password = "Password should have min 5 characters";
    }

    return errors;
}

export function validateSignUp(values) {
    let errors = {};
    if (!values.login) {
        errors.login = "Login is required";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 5) {
        errors.password = "Password should have min 5 characters";
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirm Password is required";
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = "the passwords not equal";
    }


    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid";
    }


    if (!/^(\+\d{12})$/.test(values.phone)) {
        errors.phone = "Invalid phone number (example +38077777777)";
    }


    return errors;
}