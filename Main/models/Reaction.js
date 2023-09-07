const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

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