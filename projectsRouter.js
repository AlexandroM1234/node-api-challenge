const express = require("express");
const Projects = require("./data/helpers/projectModel");
const Actions = require("./data/helpers/actionModel");
const router = express.Router();

// gettinng projects
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

// making a new project
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

// updating a project
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

// deleting a project
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

// ===== ACTIONS SECTION ======

// getting actions from projects
router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      if (projectActions) {
        res.status(200).json(projectActions);
      } else {
        res.status(404).json({ message: "project can not be found" });
      }
    })
    .catch((err) => {
      console.log("messed up getting the projects", err);
    });
});

// making a new acition
router.post("/:id/actions", (req, res) => {
  const newAction = req.body;
  const { project_id, description, notes } = req.body;
  Actions.insert(newAction)
    .then((action) => {
      if (action) {
        res.status(201).json(newAction);
      } else if (!action) {
        res
          .status(404)
          .json({ message: `project with ${project_id}id doesn't exist` });
      } else if (!description || !notes) {
        res.status(400).json({ message: "missing  description or notes" });
      } else {
        res.status(500).json({ error: "error making a new action" });
      }
    })
    .catch((err) => {
      console.log("error making an action", err);
    });
});

router.put("/:id/actions/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Actions.update(id, changes)
    .then((action) => {
      if (action) {
        res.status(201).json(changes);
      } else if (action === null) {
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

module.exports = router;
