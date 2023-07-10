// CRUD operations for users
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get one user by id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json({
        user,
        Thought: await Thought.find({ username: user.username }),
        friends: await User.find({ _id: { $in: user.userID } }),
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userID });
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await User.deleteMany({ _id: { $in: Thought.username } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userID });

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      const friend = await User.findOneAndRemove(
        { friend: req.params.UserID },
        { $pull: { friend: req.params.UserID } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No friend with this id!" });
      }

      res.json({ message: "Friend deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
