import users from '../controllers/users';
export default function(app) {
  app.get("/", function(req, res) {
    res.header("Content-type", "text/html");
    return res.end("<h1>Hello, Secure World!</h1>");
  });
  app.post("/create-user", (req, res) => {
    res.header('Content-type', 'application/json');
    return res.send(users.addUsers(req.body));
  });
  
  app.post("/login", (req, res) => {
    res.header('Content-type', 'application/json');
    return res.send(users.login(req.body));
  });

  app.get("/loggedin-user", (req, res) => {
    res.header('Content-type', 'application/json');
    return res.send(users.getLoggedInUsers());
  });
  
  app.get("/loggedin-user/:userName", (req, res) => {
    res.header('Content-type', 'application/json');
    return res.send(users.isLoggedIn(req.params));
  });
  app.get("/get-user", (req, res) => {
    res.header('Content-type', 'application/json');
    return res.send(users.getUsers());
  });
}
