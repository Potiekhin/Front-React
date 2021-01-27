import {useEffect, useState} from "react";
import {validateSignIn, validateSignUp} from "../validate";

const useForm = (callback, isLoginState) => {
    const [values, setValues] = useState({
        login: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        isLoginState && setErrors(validateSignIn(values));
        !isLoginState && setErrors(validateSignUp(values));
        setIsSubmitting(true);
    };
    return {
        handleSubmit,
        handleChange,
        values,
        errors,
    };
};
export default useForm;
