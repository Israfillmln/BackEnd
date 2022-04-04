const { DataTypes } = require("sequelize")

const book_Tag = (sequelize) => {
    return sequelize.define("book_tag", {})
}

module.exports = book_Tag