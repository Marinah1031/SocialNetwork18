const { Thoughts, User } = require('../models');

// Function to get all thoughts
async function getThoughts(req, res) {
  try {
    const dbThoughtData = await Thoughts.find().sort({ createdAt: -1 });
    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to get a single thought by id
async function getOneThought(req, res) {
  try {
    const dbThoughtData = await Thoughts.findOne({ _id: req.params.thoughtId });

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to create a thought
async function createThought(req, res) {
  try {
    const dbThoughtData = await Thoughts.create(req.body);

    const dbUserData = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: dbThoughtData._id } },
      { new: true }
    );

    if (!dbUserData) {
      return res.status(404).json({ message: 'Thought created but no user with this id!' });
    }

    res.json({ message: 'Thought successfully created!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to update a thought
async function updateThought(req, res) {
  try {
    const dbThoughtData = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to delete a thought
async function deleteThought(req, res) {
  try {
    const dbThoughtData = await Thoughts.findByIdAndRemove(req.params.thoughtId);

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    const dbUserData = await User.findByIdAndUpdate(
      dbThoughtData.userId,
      { $pull: { thoughts: dbThoughtData._id } },
      { new: true }
    );

    if (!dbUserData) {
      return res.status(404).json({ message: 'Thought created but no user with this id!' });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to add a reaction to a thought
async function addReaction(req, res) {
  try {
    const dbThoughtData = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Function to remove a reaction from a thought
async function removeReaction(req, res) {
  try {
    const dbThoughtData = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};


