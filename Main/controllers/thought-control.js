const { Thoughts, User } = require('../models');

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getOneThought(req, res) {
    try {
      const dbThoughtData = await Thoughts.findById(req.params.thoughtId);

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


  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thoughts.findByIdAndRemove({ _id: req.params.thoughtId })

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // remove thought id from user's `thoughts` field
      const dbUserData = User.findByIdAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


      // Use Promise.all to perform both operations concurrently
//       const [deletedThought, updatedUser] = await Promise.all([
//         thoughtId.findByIdAndRemove({ _id: thoughtId }),
//         User.findByIdAndUpdate(
//           { thoughts: thoughtId },
//           { $pull: { thoughts: thoughtId } },
//           { new: true }
//         ),
//       ]); 
  
//       if (!deletedThought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
//       }
  
//       res.json({ message: 'Thought successfully deleted!' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json(err);
//     }
//   },
  

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