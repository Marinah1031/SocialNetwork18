//Importing Thougts and User models from the model folder and represents the MongoDB collections
const { Thoughts, User } = require('../models');
//handeling error 

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};
//thoughtController object contains various methods of HTTP requests
const thoughtController = {
    //Get Thoughts is an asyncronous method that handles a GET request for fetching all thoughts.
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },
//Handles a GET request for getting a single thought by its thoughtId. findById method is used.
  async getOneThought(req, res) {
    try {
      const dbThoughtData = await Thoughts.findById(req.params.thoughtId);
//if the thought with id is not found, a message comes up for error handling.
      if (!dbThoughtData) {
        return res.status(404).json({ 
            message: 'No thought associated with this id!' 
        });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },
//an asyncronous method to create a thought by using a body and it is associated with a userId
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thoughts.create(req.body);

      const dbUserData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ 
            message: 'Thought created but no user associated with this id!' });
      }

      res.json({ message: 'Thought created!' });
    } catch (err) {
      handleError(res, err);
    }
  },
//Async method to update thought and the thought is found by its thoughtId and is able to update using PUT
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought associated with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

//Deleting a thought through async function and takes in the thoughtId associated with the user
  async deleteThought(req, res) {
    try {
      // Find the thought to be deleted and remove it
      const dbThoughtData = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
  
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      // removing the thought id from the associated user
      const dbUserData = await User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought is deleted' });
      }
  
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
//adding a reaction associated to the thought by taking the thoughtId and using a POST 
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought associated with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },
// Deletes a reaction by finding by the reactionId and the thoughtId to delete the reaction to the thought
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought assoicated with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = thoughtController;