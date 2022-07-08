const { Thought, User } = require("../models");
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((userData) => res.status(200).json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No thought found by that id!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
module.exports = thoughtController;
