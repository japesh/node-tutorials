// import 'core-js/es6';
// following import is for async await
import "regenerator-runtime/runtime";
import express from "express";
import http from "http";
import usersRoutes from "./routes/users";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;
import redisClient from "./redis-client";
// function handleRequest(request, response){
//     response.end('Server working properly. Requested URL : ' + request.url);
// }

const Server = http.createServer(app);

app.use(bodyParser.json());
app.use(
  "/",
  async (req, res, next) => {
    let counter = (await redisClient.getAsync("counter")) || 0;
    counter++;
    await redisClient.setAsync("counter", counter);
    req.visits = counter;
    next();
  },
  usersRoutes
);

Server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
