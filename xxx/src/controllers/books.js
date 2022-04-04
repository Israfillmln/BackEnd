const { book, book_Tag } = require("../lib/sequelize");
const fileUploader = require("../lib/uploader");

const bookControllers = {
  getAllbook: async (req, res) => {
    try {
      const { _limit = 5, _page = 1 } = req.query;

      delete req.query._limit;
      delete req.query._page;

      const getAllbooks = await book.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        include: {
          model: book_Tag,
        },
      });

      return res.status(200).json({
        message: "All books",
        result: getAllbooks,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  createNewbook: async (req, res) => {
    try {
      const { book_name, book_id, stock, tags } = req.body;

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = `book-cover-img`;
      const { filename } = req.file;

      const [newbook, created] = await book.findOrCreate({
        where: { book_name },
        defaults: {
          cover: `${uploadFileDomain}/${filePath}/${filename}`,
          stock,
          book_id,
        },
      });

      if (!created) {
        return res.status(400).json({
          message: "books already created",
        });
      }

      const newbookTag = tags.split(",");

      await book_Tag.bulkCreate(
        newbookTag.map((val) => {
          return { book_id: newbook.dataValues.id, tag_id: val };
        })
      );

      return res.status(201).json({
        message: "book created",
        result: newbook,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  editbook: async (req, res) => {
    try {
      const {} = req.params;

      const updatebook = await book.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "book edited",
        result: updatebook,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  deletebook: async (req, res) => {
    try {
      const { id } = req.params;

      const deletebook = await book.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "book deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
};

module.exports = bookControllers;
