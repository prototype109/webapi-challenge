const express = require("express");
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the index page");
});

module.exports = server;
