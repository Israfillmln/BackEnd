const express = require("express")
const todoControllers = require("../controllers/todos")
const router = express.Router()

router.get("/", todoControllers.getTodoList)
router.post("/", todoControllers.createTodoList)
router.patch("/:id", todoControllers.updateTodoList)
router.delete("/:id", todoControllers.deleteTodoList)

module.exports = router