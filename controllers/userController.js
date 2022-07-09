const { User } = require("../models");
module.exports = {
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({
        path: "friends",
      })
      .populate({
        path: "thoughts",
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
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
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
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
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
