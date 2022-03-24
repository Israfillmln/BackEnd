const {todos} = require("../database")
const {nanoid} = require("nanoid")

const todoControllers = {
    getTodoList: (req, res) => {

        if (!todos.length){
            res.status(404).json({
                message: "ToDo List not Found!"
            })
            return
        }
        res.status(200).json({
            message: "toDo List Successful",
            result: todos
        })
    },

    createTodoList: (req, res) => {
        const newTodoList = req.body

        if (!newTodoList.action){
            res.status(400).json({
                message: "Todo List Action Require!"
            })
            return
        }
        else if (!newTodoList.isDone){
            res.status(400).json({
                message: "Todo List Progress Require!"
            })
            return
        }
        
        newTodoList.id = todos.length + 1

        todos.push(newTodoList)

        res.status(201).json({
            message: "Todo List Addded",
            result: newTodoList
        })
    },

    updateTodoList: (req, res) => {
        const todoListId = req.params.id
        const todoListProgress = req.body

        
            const findIndex = todos.findIndex((todo) => {
                return todo.id == todoListId
            })

            if (findIndex == -1){
                res.status(404).json({
                    message: "List not Found!"
                })
                return
            }

            todos[findIndex] = {
                ...todos[findIndex],
                ...todoListProgress
            }

            res.status(200).json({
                message: "Todo List Edited"
            })
        
    },

    deleteTodoList: (req, res) => {
        const todoListId = req.params.id

        const findIndex = todos.findIndex((todo) => {
            return todo.id == todoListId
        })

        if (findIndex == -1){
            res.status(404).json({
                message: "List not Found!"
            })
            return
        }

        todos.splice(findIndex, 1)

        res.status(200).json({
            message: "Todo List Deleted"
        })
    }

}

module.exports = todoControllers