const express = require("express")
const app = express();

const PORT = 2000

app.get("/", (req, res) => {
    console.log("Welcome to Apil's Express API")
    res.send("<h1 style='display: flex; justify-content: center;'>Welcome to Apil's Express API</h1>")
})

app.get("/users", (req, res) => {
    res.send("<h1 style='display: flex; justify-content: center;'>Fetch Users</h1>")
})

app.get("/products", (req, res) => {
    res.send("<h1 style='display: flex; justify-content: center;'>Fetch Products</h1>")
})

app.listen(PORT, () => {
    console.log("server running in port", PORT)
})

