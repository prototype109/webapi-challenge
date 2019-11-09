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

projectRouter.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

projectRouter.post("/", validateProject, async (req, res) => {
  const newProject = await db.insert(req.body);
  res.status(201).json(newProject);
});

projectRouter.put("/:id", validateId, validateProject, async (req, res) => {
  const editedProject = await db.update(req.params.id, req.body);
  res.status(200).json(editedProject);
});

projectRouter.delete("/:id", validateId, async (req, res) => {
  const successDelete = await db.remove(req.params.id);
  res.status(200).json({ message: "succesfully deleted project" });
});

async function validateId(req, res, next) {
  const id = req.params.id;
  try {
    const project = await db.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "id of project is invalid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

function validateProject(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.name || !reqBody.description) {
    res.status(400).json({ message: "Please input missing data" });
  } else {
    next();
  }
}

module.exports = projectRouter;
