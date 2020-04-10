const express = require("express");
const Projects = require("./data/helpers/projectModel");
const router = express.Router();

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "project can not be found" });
      }
    })
    .catch((err) => {
      console.log("messed up getting the projects", err);
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  const { name, description } = req.body;
  Projects.insert(newProject)
    .then((project) => {
      if (project) {
        res.status(201).json(project);
      } else if (!name || !description) {
        res.status(400).json({
          message: "name and description is needed to make a project",
        });
      } else {
        res.status(500).json({ error: "error trying to add a new project" });
      }
    })
    .catch((err) => {
      console.log("messed up adding a new project", err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.update(id, changes)
    .then((project) => {
      if (project) {
        res.status(201).json(changes);
      } else if (project === null) {
        res
          .status(404)
          .json({ mesage: `project with ${id} id can not be found ` });
      } else {
        res.status(500).json({ error: "data cannot be retrieved" });
      }
    })
    .catch((err) => {
      console.log("messed up updating a project", err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then((removedPost) => {
      if (removedPost) {
        res.status(200).json({ message: "post is removed" });
      } else if (!removedPost) {
        res
          .status(404)
          .json({ mesage: `project with ${id} id can not be found ` });
      } else {
        res.status(500).json({ error: "error removing a post" });
      }
    })
    .catch((err) => {
      console.log("error removing a post", err);
    });
});
module.exports = router;
