const fs = require("fs");
const http = require("http");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method= "POST"><input type="text" name="message"></input><button type= "submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === "/message" && method === "POST") {
        const arr = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            arr.push(chunk)
        })

        req.on("end", () => {
            const parsedBodyArr = Buffer.concat(arr).toString();
            const splitParsedBodyArr = parsedBodyArr.split("=")[1]
            console.log(splitParsedBodyArr);
            fs.writeFile("message.txt", splitParsedBodyArr, () => {
                res.statusCode = 302;
                res.setHeader("Location", "/")
                return res.end()

            })
        })

    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>First Page</title></head>')
    res.write('<body><h1>Merhaba</h1></body>')
    res.write('</html>')
    res.end()

}
module.exports = requestHandler