module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/login", auth.login);

    //route to initialize admin at first launch, no need to perform more than once
    router.post("/", user.admin);

    app.use('/api', router);
};