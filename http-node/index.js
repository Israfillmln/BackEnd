const { read } = require("fs");
const http = require("http");
const url = require("url");

const PORT = 2000;

const database = [
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

http.createServer((req, res) => {
    const httpMethod = req.method;

    const parsedURL = url.parse(req.url, true)

    if(httpMethod == "GET"){
        res.write(JSON.stringify(database) )
        res.end()
    }

    if(httpMethod == "POST"){
        req.on("data", (data) => {
            database.push(JSON.parse(data.toString()))
            res.statusCode = 201
            res.end(`ta ${httpMethod}mi!`)
        })
        
    }

    if(httpMethod == "PATCH"){
        req.on("data", (data) => {
            const parsedDatabase = JSON.parse(data.toString())
            const id = parsedURL.path.split("/")[2]

            const findIndex = database.findIndex((val) => {
                return val.id == id
            })

            if(findIndex == -1) {
                res.statusCode = 404
                res.end("database " + id + " not found")
                return
            }

            database[findIndex] = {
                ...database[findIndex],
                ...parsedDatabase
            }

            res.end(`ta ${httpMethod}mi!`)
        })
        
    }
    if(httpMethod == "DELETE"){
        const id = parsedURL.path.split("/")[2]

        const findIndex = database.findIndex((val) => {
            return val.id == id
        })

        database.splice(findIndex, 1)

        res.end(`ta ${httpMethod}mi!`)
    }

    // console.log(parsedURL.query.username)

    // res.write(`oioioioi ada yang ma'${httpMethod}` )

}).listen(PORT, () => {

    console.log("server running")
})