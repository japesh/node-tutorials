const http = require("http");

const PORT = process.env.PORT || 3000;

function handleRequest(request, response) {
  response.end("Server working properly. Requested URL : " + request.url);
}

const Server = http.createServer(handleRequest);

Server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
