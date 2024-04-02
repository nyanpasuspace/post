const { Router } = require("express");
const userController = require("./user");
module.exports = async function initControllers() {
    const router = Router();
    router.use("/api/user", await userController());
    return router;
};
