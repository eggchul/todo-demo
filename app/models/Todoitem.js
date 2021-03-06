module.exports = (sequelize, Sequelize) => {
  const Todoitem = sequelize.define("todoitem", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    listname: {
      type: Sequelize.STRING
    },
    done: {
      type: Sequelize.BOOLEAN
    }
  });

  return Todoitem;
};