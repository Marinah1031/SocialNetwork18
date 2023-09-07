const { User, Thought } = require('../models');

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

const userController = {
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().select('select');
      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getOneUser(req, res) {
    try {
      const dbUserData = await User.findById(req.params.userId)
        .select('select')
        .populate('friends')
        .populate('thoughts');

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user associated with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user associated with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndDelete(req.params.userId);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user ssociated with this id!' });
      }

      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      handleError(res, err);
    }
  },

  async addFriend(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = userController;
