const { Tag } = require("../lib/sequelize");

const tagControllers = {
  getAllTag: async (req, res) => {
    try {
      const findTags = await Tag.findAndCountAll({
        where: {
          ...req.query,
        },
      });

      res.status(200).json({
        message: "Find tags",
        result: findTags,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  createNewTag: async (req, res) => {
    try {
      const { tag_name } = req.body;

      const newTag = await Tag.create({
        tag_name,
      });

      return res.status(201).json({
        message: "Tag added",
        result: newTag,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error",
      });
    }
  },
  deleteTag: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteTag = await Tag.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Tag deleted",
        result: deleteTag,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
};

module.exports = tagControllers;
