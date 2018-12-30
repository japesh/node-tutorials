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
