const express = require("express");
const Actions = require("./data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  Actions.get(req.query)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log("messed up getting the array of projects", err);
    });
});

module.exports = router;
