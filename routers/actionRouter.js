const express = require("express");
const db = require("../data/helpers/actionModel");

const actionRouter = express.Router();

actionRouter.get("/", async (req, res) => {
  try {
    const actionsArr = await db.get();
    res.status(200).json(actionsArr);
  } catch (error) {
    res.status(500).json(error);
  }
});

actionRouter.get("/:id", validateId, async (req, res) => {
  res.status(200).json(req.action);
});

actionRouter.post("/:id", validateId, validateAction, async (req, res) => {
  const newAction = await db.insert({ ...req.body, project_id: req.params.id });
  res.status(201).json(newAction);
});

actionRouter.put("/:id", validateId, validateAction, async (req, res) => {
  try {
    const updatedAction = await db.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function validateId(req, res, next) {
  const id = req.params.id;
  try {
    const action = await db.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "id is invalid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

function validateAction(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.description || !reqBody.notes) {
    res.status(400).json({ message: "Please input missing data" });
  } else {
    //req.body.project_id = req.params.id;
    next();
  }
}

module.exports = actionRouter;
