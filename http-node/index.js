const http = require("http");

const PORT = 2000;

http.createServer((req, res) => {
    const httpMethod = req.method;

    console.log(`ada yang masuk sebagai ${httpMethod}!`)
    res.write("oioioioi")
    res.end()

}).listen(PORT, () => {

    console.log("server running")
})