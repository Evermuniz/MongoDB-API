const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema({
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
    reactions: [ReactionSchema],
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;