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
                     if (!dbThoughtData){
                        return res.status(404).json ({ 
                            message: 'No thought associated with this ID' 
                        });
                    }

                    res.json(dbThoughtData);
                    }catch (err) {
                        handleError(res, err);
                    }
                },
     
};

module.exports = thoughtController;