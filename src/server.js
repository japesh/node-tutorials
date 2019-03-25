import express from "express";
import http from "http";
import usersRoutes from "./routes/users";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;
// function handleRequest(request, response){
//     response.end('Server working properly. Requested URL : ' + request.url);
// }

const Server = http.createServer(app);

app.use(bodyParser.json());
app.use('/', usersRoutes);

Server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
