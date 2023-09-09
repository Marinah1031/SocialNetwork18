const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/date-format');



const thoughtSchema = new Schema({
    _id: {
      type: String,
      validate: {
        validator: (value) => ObjectId.isValid(value),
        message: 'Invalid ObjectId',
        }
    },

        thoughtText: {
            type: String,
            required: [true, 'This section cannot be blank'],
            minLength: 1,
            maxLength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        },
        {
            toJSON: {
                getters: true,
            },
            id: false,
        }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);


module.exports = Thoughts;