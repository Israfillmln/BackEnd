const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const { todosRoutes } = require("./routes")
const fs = require("fs")
const moment = require("moment")

dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT



app.use((req, res, next) => {
    const httpMethod = req.method
    const logFormat = `${httpMethod} /todos ${moment().format("hh:mm:ss DD/MM/YYYY")}`

    fs.appendFileSync(`${__dirname}/../.logs`, logFormat + "\n")

    console.log(logFormat);
    
    next()
})

app.use("/todos", todosRoutes)

app.listen(PORT, () => {
    console.log("Listening in PORT:", PORT);
})