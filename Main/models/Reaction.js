//importing Schema and Types and imports dateFormat function from the external module ('date-format')
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');
//defining reactionSchema with fields for reactionId, body, username and createdAt
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
    },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 300,
        },
        username: {
            type:String,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat,
        },

        },
        {
            toJSON: {
                getters: true,
            },
            id: false,
        }
);

module.exports = reactionSchema;