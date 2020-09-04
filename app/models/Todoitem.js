module.exports = (sequelize, Sequelize) => {
  const Todoitem = sequelize.define("todoitem", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
    // published: {
    //     type: Sequelize.BOOLEAN
    // }
  });

  return Todoitem;
};