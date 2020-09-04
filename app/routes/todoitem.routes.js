module.exports = app => {
    const todoitems = require("../controllers/todoitem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", todoitems.create);
  
    // Retrieve all Tutorials
    router.get("/", todoitems.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", todoitem.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", todoitems.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", todoitems.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", todoitems.delete);
  
    // Create a new Tutorial
    router.delete("/", todoitems.deleteAll);
  
    app.use('/api/todoitems', router);
  };