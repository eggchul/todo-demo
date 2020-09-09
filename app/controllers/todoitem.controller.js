const db = require("../models");
const Todoitem = db.todoitem;
const Op = db.Sequelize.Op;

// Create and Save a new todo item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.listname) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a todo item
      const todoitem = {
        title: req.body.title,
        description: req.body.description,
        listname: req.body.listname,
        done: req.body.done ? req.body.published : false
      };
    
      // Save todo item in the database
      Todoitem.create(todoitem)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
};

// Retrieve all tido items from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    const listname = req.params.listname;
    var condition = listname ? { listname: { [Op.iLike]: `%${listname}%` } } : null;
    Todoitem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items from list."
        });
        });
};

// Find a single todo item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Todoitem.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// check a todo item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Todoitem.update({done : true}, {
        where: {id: req.params.id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "todo item is updated."
            });
        }else{
            res.send({
                message: "item not found."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:  "Error updating todoitem with id=" + id
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Todoitem.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete item with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete item with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  const listname = req.params.listname;
    Todoitem.destroy({
        where: { listname: listname },
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Todos were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all items."
          });
        });
};