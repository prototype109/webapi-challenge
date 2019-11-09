const express = require("express");
const projectRouter = require("./routers/projectRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the index page");
});

module.exports = server;
