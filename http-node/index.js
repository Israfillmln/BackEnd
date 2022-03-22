const http = require("http");
const url = require("url")

const PORT = 2000;

const users = [
    {
        id: 1,
        username: "mark",
        email: "mark@mail.com"
    },
    {
        id: 1,
        username: "steeve",
        email: "steeve@mail.com"
    },
]

http.createServer((req, res) => {
    const httpMethod = req.method

    const parsedURL = url.parse(req.url, true)

    if(httpMethod == "GET") {

        res.write(JSON.stringify(users))
        res.end()

    }

    if(httpMethod == "PATCH") {

        let data = "";
        req.on("data", (data) => {
            const parsedData = JSON.parse(data.toString())
            const id = parsedURL.path.split("/")[2]

            const findIndex = users.findIndex((val) => {
                return val.id == id
            })

            users[findIndex] = {
                ...users[findIndex],
                ...parsedData
            }
        })

    }

    if(httpMethod == "POST") {

        let data = "";
        req.on("data", (data) => {
            // console.log(data.toString())
            users.push(JSON.parse(data.toString()))
            res.end("User Added")
        })

    }

    // if(httpMethod == "DELETE") {

    //     let data = "";
    //     req.on("data", (data) => {
    //         // console.log(data.toString())
    //         users.push(JSON.parse(data.toString()))
    //         res.end("User Added")
    //     })

    // }

}).listen(PORT, () => {
    console.log("server running")
})