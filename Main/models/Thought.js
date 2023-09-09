const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

//Thoughts
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: { 
            type: String,
            required: true,
        },    
        reactions: [ reactionSchema ], 
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get( function (){
        return this.reactions.length;
    });

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;