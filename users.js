const { create } = require("domain");
const http = require("http");
const { parse } = require("path");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.write("<html>")
        res.write("<head><title>Hello from the otherside!</title></head>")
        res.write('<body><form action="/create-user" method= "POST" ><input type="text" name="username"></input><button type="submit">Send</button></form></body>')
        res.write("</html>")
        return res.end();
    }

    if (url === "/users") {
        res.setHeader("Content-Type", "text/html")
        res.write("<html>")
        res.write("<ul><li>Esra Dogan</li><li>Test User</li></ul>");
        res.write("</html>")
        return res.end();
    }

    if (url === "/create-user" && method === "POST") {
        const arr = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            arr.push(chunk)
        })

        req.on("end", () => {
            const parsedBody = Buffer.concat(arr).toString();
            const splitParsedBody = parsedBody.split("=")[1];
            console.log(splitParsedBody)
            return res.end();

        })

        res.statusCode = 302;
        res.setHeader("Location", "/")
        res.end();
    }


});

server.listen(3000)