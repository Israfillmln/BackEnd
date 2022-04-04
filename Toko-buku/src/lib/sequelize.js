const { Sequelize } = require("sequelize");
const mySqlConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: mySqlConfig.MYSQL_USERNAME,
  password: mySqlConfig.MYSQL_PASSWORD,
  database: mySqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: "my-sql",
});

// Models
const Tag = require("../models/tag")(sequelize);
const book = require("../models/book")(sequelize)
const book_Tag = require("../models/book_tags")(sequelize)

// Assosiations
Tag.hasMany(book_Tag, { foreignKey: "tag_id" })
book_Tag.belongsTo(Tag, { foreignKey: "tag_id" })
book.hasMany(book_Tag, { foreignKey: "book_id" })
book_Tag.belongsTo(book, { foreignKey: "book_id" })

module.exports = {
  sequelize,
  Tag,
  book,
  book_Tag
};
