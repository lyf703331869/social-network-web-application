const { Thought, User } = require("../models");
module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughtData) => res.status(200).json(thoughtData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found by that id!" });
        }
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.status(200).json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        ).then((userData) => {
          if (!userData) {
            return res
              .status(404)
              .json({ message: "No user found with this id!" });
          }
          res.status(200).json(thoughtData);
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
