const { DataTypes } = require("sequelize");

const Books = (sequelize) => {
  return sequelize.define("Books", {
    books_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Books;
