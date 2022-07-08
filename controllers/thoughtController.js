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
};
module.exports = thoughtController;
