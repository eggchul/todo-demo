module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.register);
  
    // Retrieve all Tutorials
    router.get("/", users.login);
  
    app.use('/api/users', router);
  };