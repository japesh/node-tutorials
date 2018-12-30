# Node Tutorials

The purpose of this prject is to teach about Node.

## NodeJS

- [Node.js](https://nodejs.org/en/about/) is a JavaScript runtime environment.
- It is asynchronous event driven.
- Node is designed to build scalable network applications.

## Why nodeJS?

Before node each incoming request or connection the server treat it as a new thread of execution or as a new process to handle the request and send a response. This makes perfect sense, but in practice it incurs a great deal of overhead.

Node.js takes a different approach. It runs a single-threaded event loop registered with the system to handle connections, and each new connection causes a JavaScript callback function to fire.

The callback function can handle requests with non-blocking I/O calls, and if necessary can spawn threads from a pool to execute blocking or CPU-intensive operations and to load-balance across CPU cores.

Which helps it to save a lot of memory without compromising the scalability.

## What is the [Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)?

The event loop allows Node.js to perform non-blocking I/O operations by transfering operations to the system kernel whenever possible.

Since most kernels are mutithreded, they can handle multiple operations executing in the background.

When one of these operations completes, the kernel tells Node.js so that the appropriate callback can be added to the poll queue to eventually be executed.

## NPM

NPM is the official Node Package Manager (it’s not the only one), where “all” your Node packages live on the internet.

npm consists of three distinct components:

- the website
- the Command Line Interface (CLI)
- the registry

Use the website to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up Orgs (organizations) to manage access to public or private packages.

The CLI runs from a terminal, and is how most developers interact with npm.

The registry is a large public database of JavaScript software and the meta-information surrounding it.

```
npm install --save <pkg>
```

## How to start?

1. Create a package.json file - `npm init`

   Package.json is a file that gives the necessary information to npm which allows it to identify the project as well as handle the project's dependencies.
   npm init will prompt you to enter some information such as the app name, description, version, author, keyword and also ask if what you see is what you like.

   You should have something like this eventually.

   ![alt text](https://raw.githubusercontent.com/japesh/node-tutorials/master/images/npm-init.png?_sm_au_=iVVLH21Vn15SRQs5)

2. Create a file called index.js - `echo > index.js`.
3. Create a folder called src - `mkdir src`.

   Inside this folder called api, create two separate folders called routes, and controllers by running
   `mkdir src\controllers src\routes`.
   ![alt text](https://raw.githubusercontent.com/japesh/node-tutorials/master/images/folder-structure.PNG?_sm_au_=iVVLH21Vn15SRQs5)

## Server Setup

1. Install "nodemon" and "http". "http" is used to create the server while nodemon helps to keep track
   of changes by watching changed files and automatically restart the server.

   ```
   npm install --save-dev nodemon
   ```

   ```
   npm install --save http
   ```

2. Open the index.js and write following code.

   ```
   var http = require('http');

   // define the port of access for your server
   const PORT =  process.env.PORT || 3000;

   // function is used to handle the requests and send response
   function handleRequest(request, response){
       response.end('Server working properly. Requested URL : ' + request.url);
   }

   // Create server
   const Server = http.createServer(handleRequest);

   // Start listening to server !
   Server.listen(PORT, function(){
       // Callback triggered when server is successfully listening. Hurray!
       console.log("Server listening on: http://localhost:%s", PORT);
   });
   ```

3. Add start script in package.json `"start": "nodemon index.js"`
   ![alt text](https://raw.githubusercontent.com/japesh/node-tutorials/master/images/adding-script.PNG?_sm_au_=iVVLH21Vn15SRQs5)
4. Run `npm start` on the terminal.

   ![alt text](https://raw.githubusercontent.com/japesh/node-tutorials/master/images/output-http.PNG?_sm_au_=iVVLH21Vn15SRQs5)

5. check active port
   ```
   netstat -a
   ```

## Defining routes

1. install express, body-parser
   ```
   npm install --save express`
   ```
   ```
   npm install body-parser --save
   ```
2. Modify index.js as follows.

   ```
   import express from "express";
    import http from "http";
    import usersRoutes from "./src/routes/users";
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


   ```

   express is a framework and it is used to define routes, middleware and many more functionality. body-parser is a middleware,
   it is used to extract the entire body portion of an incoming request stream and exposes it on req.body.

3. Create users.js in routes - `echo > src\controllers\users.js` `echo > src\routes\users.js`.
4. Open src\routes\users.js and modify it as.
   Route is the 

   ```
    import users from "../controllers/users";
    import express from "express";

    const router = express.Router();
    router.get("/", function(req, res) {
        res.header("Content-type", "text/html");
        return res.end("<h1>Hello, Secure World!</h1>");
    });
    router.post("/create-user", (req, res) => {
        res.header("Content-type", "application/json");
        return res.send(users.addUsers(req.body));
    });
    router.post("/login", (req, res) => {
        res.header("Content-type", "application/json");
        return res.send(users.login(req.body));
    });
    router.get("/loggedin-user", (req, res) => {
        res.header("Content-type", "application/json");
        return res.send(users.getLoggedInUsers());
    });

    router.get("/loggedin-user/:userName", (req, res) => {
        res.header("Content-type", "application/json");
        return res.send(users.isLoggedIn(req.params));
    });
    router.get("/get-user", (req, res) => {
        res.header("Content-type", "application/json");
        return res.send(users.getUsers());
    });

    export default router;

   ```

## configuring babel

1. Install preset-env babel-cli and babel-preset-env

```
npm install --global babel-cli
```

```
npm install --save-dev babel-preset-env
```

2. Add .babelrc `echo > index.js`
   open .babelrc and modify it as follows

```
{
 "presets": ["env"]
}
```

3. add script in package.json as follows.

```
    {
        "scripts": {
             ...
             "babel-start": "nodemon --exec babel-node index.js"
         },
    }
```

4. run `npm run babel-start`

[why-nodejs]: https://www.infoworld.com/article/3210589/node-js/what-is-nodejs-javascript-runtime-explained.html

```

```
