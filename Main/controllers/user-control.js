const { User, Thoughts } = require('../models');
//error handling
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

const userController = {
    //the .select('-__v') specifies that the field should be excluted from the query results.
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().select('-__v');
      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },
//get one user by finding by userId by GET
  async getOneUser(req, res) {
    try {
      const dbUserData = await User.findById(req.params.userId)
        .select('-__v')
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
//creating a new user by using POST
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      handleError(res, err);
    }
  },

  //updating an existing user by PUT request to /api/users/:userid
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

  //deleting an exiting user by DELETE request to /api/users/:userId
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndDelete(req.params.userId);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user associated with this id!' });
      }

      await Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      handleError(res, err);
    }
  },

  //adding a friend by findbyId and using the user's id to link with another user's id to become friends
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
//deleting a friend throught DELETE request by using the user id and friend id (which is another userId)
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