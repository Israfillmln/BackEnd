const express = require("express")
const app = express()

const PORT = 2002;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<center /><h1>oi, welcome</h1>")
})

const users = [
    {
        id: 1,
        username: "bill",
        email: "bill@mail.com"
    },
    {
        id: 2,
        username: "seto",
        email: "seto@mail.com"
    },
    {
        id: 3,
        username: "mark",
        email: "mark@mail.com"
    },
]

app.get("/users", (req, res) => {
    if (users.length){
        res.status(200).json({
            message: "fetched",
            result: users
        })
    } else {
        res.status(404).send("not found brouh")
    }
})

app.post("/users", (req, res) => {
    const data = req.body;

    if(!data.username) {
        res.status(400).json({
            message: "User is required"
        })
        return;
    }

    users.push(data)

    res.status(201).json({
        message: "added",
    })
})

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id

    const findIndex = users.findIndex((val) => {
        return val.id == userId
    })

    if(findIndex == -1) {
        res.status(400).json({
            message: `user with ID ${userId} not found`
        })
        return
    }

    users.splice(findIndex, 1)
    res.status(200).json({
        message: "deleted"
    })
})

app.get("/products", (req, res) => {
    res.send("<center /><h1 />fetch products")
})

app

app.listen(PORT, () => {
    console.log("Server running in port", PORT)
})