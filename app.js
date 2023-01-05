const http = require("http");
const routes = require("./routes.js");

const server = http.createServer(routes)

server.listen(3000)

//Not: Üstteki functionlar hemen çağrılmaz, alt satırdaki kodlar işletilir parsing gerçekleştikten sonra functionlar geriye değer döndürmeye başlar.
//Event loop u uzun süreli bloklamamak gerekir.