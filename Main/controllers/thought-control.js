const { Thought, User } = require('../models');

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findById(req.params.thoughtId);

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought associated with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user associated with this id!' });
      }

      res.json({ message: 'Thought created!' });
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
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
      const dbThoughtData = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought associated with this id!' });
      }

      const dbUserData = await User.findByIdAndUpdate(
        dbThoughtData.userId,
        { $pull: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought deleted but no user associated with this id!' });
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      handleError(res, err);
    }
  },

  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
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
      const dbThoughtData = await Thought.findByIdAndUpdate(
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
