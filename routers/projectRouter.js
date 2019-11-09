const express = require("express");
const db = require("../data/helpers/projectModel");
const projectRouter = express.Router();

projectRouter.get("/", async (req, res) => {
  try {
    const resourceArr = await db.get();
    res.status(200).json(resourceArr); //empty array counts as validly obtained request data
  } catch (error) {
    res.status(500).json(error);
  }
});

projectRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const resourceArr = await db.get(id);
    res.status(200).json(resourceArr); //empty array counts as validly obtained request data
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = projectRouter;
