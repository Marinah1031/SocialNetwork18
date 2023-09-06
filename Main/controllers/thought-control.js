const { Thought, User } = require('../models');

const handleError = (res, err) => {
    console.error(err);
    res.status(500).json(err);
};

const thoughtController = {
    //getting all thoughts
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
            res.json(dbThoughtData);
        } catch (err) {
            handleError(res, err);
        }
    },

    async getOneThought(req, res) {
        try {
            const dbThoughtData = await Thought.findById(req.params.thoughtId);
            if (!dbThoughtData) {
                return res.status(404).json({
                    message: 'No thought associated with this ID'
                });
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
                {
                    $push: {
                        thoughts: dbThoughtData._id
                    }
                },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({
                    message: 'Thought created with no user associated with this ID'
                });
            }

            res.json({
                message: 'Thoughts created successfully'
            });
        } catch (err) {
            handleError(res, err);
        }
    },

    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!dbThoughtData) {
                return res.status(404).json({
                    message: 'No thought associated with this ID'
                });

                res.json(dbThoughtData);
            } catch (err) {
                handleError(res, err);
            }
        },

        async deleteThought(req, res) {
            try {
                const dbThoughtData = await Thought.findByIdAndRemove(req.params.thoughtId);

                if (!dbThoughtData) {
                    return res.status(404).json({
                        message: 'No thought associated with this ID'
                    });
                }

                const dbUserData = await User.findByIdAndUpdate(
                    dbThoughtData.userId,
                    {
                        $pull:
                        {
                            thoughts:
                                dbThoughtData._id
                        }
                    },
                    { new: true }
                );

                
            }
        }
    }
};

module.exports = thoughtController;