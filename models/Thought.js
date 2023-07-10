// Thought model with the ReactionSchema nested in it
const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");
const { getFormattedDate } = require("../utils/date");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual to get the total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// virtual to format the timestamp on query
ThoughtSchema.virtual("createdAt").get(getFormattedDate);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
