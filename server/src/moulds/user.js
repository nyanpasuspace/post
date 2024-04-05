const Yup = require("yup");

module.exports = ()  => {
    const createUserSchema = Yup.object({
        username: Yup.string()
            .required("Required.")
            .min(2, "Username must be at least 2 characters.")
            .max(15, "Username must not be longer than 15 characters.")
        ,
        password: Yup.string()
            .required("Required.")
            .min(6, "Password must be at least 6 characters.")
            .max(20, "Password must not be longer than 20 characters.")
            .matches(/^[a-zA-Z0-9~!@#%^&()_+=-]*$/, "Password must only contain letters, numbers, and ~!@#%^&()_+=-.")
    })
    return createUserSchema;
}
